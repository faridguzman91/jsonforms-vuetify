<template>
  <div class="flex w-full justify-between items-center gap-4 mt-2 mb-4">
    <i class="pi pi-exclamation-triangle text-red-200 font-bold text-xl mr-4" />
    <p v-if="props.item">
      Are you sure you want to delete <b>{{ props.item.name }}</b>?
    </p>
  </div>
  <hr />
  <div class="footer flex flex-row justify-between items-center mt-4">
    <Button label="No" icon="pi pi-times" text @click="$emit('cancel-delete')" />
    <Button label="Yes" icon="pi pi-check" @click="$emit('confirm-delete')" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['cancel-delete', 'confirm-delete'])
</script>
