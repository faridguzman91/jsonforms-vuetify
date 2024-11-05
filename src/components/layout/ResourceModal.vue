<template>
  <div>
    <Dialog v-model:visible="props.isVisible" :style="{ width: '600px' }" :header="props.modalTitle" :modal="true"
      draggable="true" closeOnEscape :closable="false">
      <slot></slot>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  modalTitle: {
    type: String,
  },
})

const emit = defineEmits(['update:isVisible'])
</script>
