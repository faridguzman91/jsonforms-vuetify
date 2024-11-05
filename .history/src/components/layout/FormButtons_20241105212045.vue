<template>
  <div class="mt-6 flex flex-row justify-between items center">
    <button type="button" @click="$emit('cancelClose')" class="btn bg-gray-500 text-white">
      {{ props.buttonOne }}
    </button>
    <button type="button" @click="$emit('saveClose')" class="btn bg-cyan-500 text-white">
      {{ props.buttonTwo }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  buttonOne: String,
  buttonTwo: String,
})

const emit = defineEmits(['cancelClose', 'saveClose'])
</script>
