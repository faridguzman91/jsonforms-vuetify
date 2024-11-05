<template>
  <p class="text-xl font-bold mb-4 mt-4">
    <font-awesome-icon :icon="props.icon" class="mr-2" />
    {{ props.resourceHeader }}
  </p>
  <divider />
  <DataTable :value="props.resources" resizeableColumns showGridlines dataKey="id" v-model:filters="filters" paginator
    :rows="5" :rowsPerPageOptions="[5, 10]" :globalFilterFields="['name', 'description']"
    tableStyle="min-width: 50rem; border-radius:50px; border: 1px solid #e0e0e0"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    CurrentPageReportTemplate="{first} to {last} of {totalRecords}">
    <template #header>
      <div class="flex flex-row items-center justify-between w-full">
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" :placeholder="$t('header.keyword_search')" />
        </IconField>
        <Toolbar class="mb-6">
          <template #start>
            <Button :label="$t('header.new_button_label')" icon="pi pi-plus" severity="success" class="mr-4"
              @click="openNew" />
          </template>
        </Toolbar>
      </div>
    </template>
    <Column field="name" :header="$t('table_header.name')" />
    <Column field="description" :header="$t('table_header.description')" />
    <Column field="spec.capacity" :header="$t('table_header.capacity')" />
    <Column field="spec.hostname" :header="$t('table_header.hostname')" />
    <Column field="created_at" :header="$t('table_header.created_at')" />
    <Column field="updated_at" :header="$t('table_header.updated_at')" />
    <Column :header="$t('table_header.actions')" :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editResourceModal(slotProps.data)" />
        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteResourceModal(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const filters = ref({
  global: { value: null, matchMode: 'contains' },
  name: { value: null, matchMode: 'startsWith' },
  description: { value: null, matchMode: 'startsWith' },
})

const props = defineProps({
  resources: {
    type: Array as () => Resource[],
    required: true,
  },
  resourceHeader: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['openNew', 'editResource', 'deleteResource'])

const openNew = () => {
  emit('openNew')
}

const editResourceModal = (resource: Resource) => {
  emit('editResource', resource)
}

const deleteResourceModal = (resource: Resource) => {
  emit('deleteResource', resource)
}
</script>
