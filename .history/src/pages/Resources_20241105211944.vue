<template>
  <div class="card">
    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab v-for="(kind, index) in resourceKinds" :key="kind" :value="index">
          <font-awesome-icon :icon="icons[kind]" class="mr-2" />
          {{ $t(`resource_kind.${kind}`) }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="(kind, index) in resourceKinds" :key="kind" :value="index">
          <ResourceTable :resources="resources[index]" :resourceHeader="$t(`resource_kind.${kind}`)" :icon="icons[kind]"
            @openNew="openAddEditModal(kind)" @editResource="openEditModal(kind, $event)"
            @deleteResource="openDeleteModal(kind, $event)" />
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!-- Modal -->

    <modal :isVisible="openResourceModal" :modalTitle="modalTitle">
      <template v-if="isAddEditMode">
        <resource-form :data="resourceToEdit" @saveData="saveResource" @closeModal="closeModal" :closeOnSave="true" />
      </template>
      <template v-if="isDeleteResourceMode">
        <delete-single-item :item="resourceToDelete" @cancel-delete="closeModal" @confirm-delete="deleteResource" />
      </template>
    </modal>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import DeleteSingleItem from '../components/layout/DeleteModal.vue';
import Modal from '../components/layout/ResourcesModal.vue';
import ResourceForm from '../components/ResourcesForm.vue';
import ResourceTable from '../components/tables/ResourceTable.vue';
import ResourceService from '../services/ResourceService';
import { useResourceKindStore } from '../store/useResourceKind.ts';

const { t } = useI18n(); // Initialize useI18n
const toast = useToast();

const activeTab = ref(0);
const resourceKinds = [
  'InteractionsInstance',
  'SessionBorderController',
  'Trunk',
  'TransformationRules',
  'InboundRoutingRule',
  'OutboundRoutingRule',
];

const resourceKindStore = useResourceKindStore();

const icons = {
  InteractionsInstance: ['fas', 'gears'],
  SessionBorderController: ['fas', 'ethernet'],
  Trunk: ['fas', 'square-phone'],
  TransformationRules: ['fas', 'scale-balanced'],
  InboundRoutingRule: ['fas', 'phone'],
  OutboundRoutingRule: ['fas', 'phone-flip'],
};

const resources = ref<Resource[][]>([]);
const activeKind = ref('');
const isModalOpen = ref(false);

onMounted(async () => {
  resources.value = await Promise.all(resourceKinds.map(fetchResources));
  resourceKindStore.setActiveResourceKind(resourceKinds[activeTab.value]);
});

watch(activeTab, async (newTab) => {
  resourceKindStore.setActiveResourceKind(resourceKinds[newTab]);

  if (!resources.value[newTab] || resources.value[newTab].length === 0) {
    resources.value[newTab] = await fetchResources(resourceKinds[newTab]);
  }
});

// Modal state management
const openResourceModal = ref(false);
const isAddEditMode = ref(false);
const isDeleteResourceMode = ref(false);
const modalTitle = ref('');
const resourceToEdit = ref(null);
const resourceToDelete = ref(null);

// Methods to open modals
const openAddEditModal = (kind) => {
  activeKind.value = kind;
  resourceToEdit.value = {}; // New resource or reset the form
  modalTitle.value = `Add Resource`;
  isAddEditMode.value = true;
  isDeleteResourceMode.value = false;
  openResourceModal.value = true;
};

const openEditModal = (kind, resource) => {
  activeKind.value = kind;
  resourceToEdit.value = resource; // The resource should include the revision number
  modalTitle.value = `Edit Resource: ${resource.name}`;
  isAddEditMode.value = true;
  isDeleteResourceMode.value = false;
  openResourceModal.value = true;
};

const openDeleteModal = (kind, resource) => {
  resourceToDelete.value = resource;
  modalTitle.value = `Delete ${resource.name}`;
  isAddEditMode.value = false;
  isDeleteResourceMode.value = true;
  openResourceModal.value = true;
  activeKind.value = kind;
};

const closeModal = () => {
  openResourceModal.value = false;
};

const saveResource = async (data) => {
  try {
    if (resourceToEdit.value?.id) {
      const updatePayload = {
        ...data,
        revision: resourceToEdit.value.revision,
      };

      const updatedResource = await ResourceService.updateResource(
        activeKind.value,
        resourceToEdit.value.id,
        updatePayload
      );
      if (updatedResource) {
        toast.add({
          severity: 'success',
          summary: t('resource.update_success_title'),
          detail: t('resource.update_success_detail', {
            kind: t(`resource_kind.${activeKind.value}`),
            name: updatedResource.name,
          }),
          life: 3000,
        });
      } else {
        throw new Error('Failed to update the resource.');
      }
    } else {
      await ResourceService.createResource(activeKind.value, data);
      toast.add({
        severity: 'success',
        summary: t('resource.create_success_title'),
        detail: t('resource.create_success_detail', {
          kind: t(`resource_kind.${activeKind.value}`),
        }),
        life: 3000,
      });
    }
    resources.value[resourceKinds.indexOf(activeKind.value)] =
      await fetchResources(activeKind.value);
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('error.generic_error'),
      detail: t('error.failed_to_create', {
        kind: t(`resource_kind.${activeKind.value}`),
      }),
      life: 3000,
    });
  } finally {
    closeModal();
  }
};

// Deleting the resource
const deleteResource = async () => {
  try {
    // Pass the kind and id to the deleteResource method
    const success = await ResourceService.deleteResource(
      activeKind.value,
      resourceToDelete.value.id
    );
    if (success) {
      toast.add({
        severity: 'success',
        summary: t('resource.delete_success_title'),
        detail: t('resource.delete_success_detail', {
          name: resourceToDelete.value.name,
        }),
        life: 3000,
      });
      resources.value[resourceKinds.indexOf(activeKind.value)] =
        await fetchResources(activeKind.value);
    } else {
      toast.add({
        severity: 'error',
        summary: t('error.generic_error'),
        detail: t('error.failed_to_delete', {
          name: resourceToDelete.value.name,
        }),
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('error.generic_error'),
      detail: t('error.failed_to_delete', {
        name: resourceToDelete.value.name,
      }),
      life: 3000,
    });
  } finally {
    closeModal();
  }
};

const fetchResources = async (kind) => {
  try {
    const response = await ResourceService.getResourcesByKind(kind);
    if (response.length === 0) {
      toast.add({
        severity: 'warn',
        summary: t('resource.fetch_no_results_title'),
        detail: t('resource.fetch_no_results_detail', {
          kind: t(`resource_kind.${kind}`),
        }),
        life: 3000,
      });
    }
    return response;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('error.generic_error'),
      detail: t('error.failed_to_load', {
        kind: t(`resource_kind.${kind}`),
      }),
      life: 3000,
    });
  }
};
</script>
