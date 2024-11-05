import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useResourceKindStore = defineStore('resource', () => {
  // Track the active resource kind (resource tab name)
  const activeResourceKind = ref('')

  // Store for managing schemas (fetched dynamically or statically defined)
  const schemas = ref([])

  // Action to update the active resource kind
  const setActiveResourceKind = (kind: string) => {
    activeResourceKind.value = kind
  }

  // Action to set schemas (you can fetch these from API if needed)
  const setSchemas = (newSchemas: any[]) => {
    schemas.value = newSchemas
  }

  const setSchemaForKind = (kind: any, schema: object) => {
    schemas.value[kind] = schema;
  };

  // Computed property to get the current schema based on active resource kind
  const currentSchema = computed(() => {
    return schemas.value.find(
      (schema) => schema['x-quandago-resource-kind'] === activeResourceKind.value
    )
  })

  return {
    activeResourceKind,
    schemas,
    setActiveResourceKind,
    setSchemas,
    setSchemaForKind,
    currentSchema,
  }
})
