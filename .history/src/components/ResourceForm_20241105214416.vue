<template>
  <div>
    <img src="../../assets/quandago-logo.png" alt="q" />
    <div v-if="isLoading">Loading schema, please wait...</div>
    <json-forms v-if="!isLoading && schema" :data="data" :renderers="frozenRenderers" :schema="schema"
      :uischema="uischema" @change="onChange" class="mt-6" />
    <div v-else-if="!isLoading && !schema" class="text-xl text-red-500">
      Error loading form schema.
    </div>

    <form-buttons v-if="!isLoading && schema" buttonOne="Cancel" buttonTwo="Save" @cancel-close="cancel"
      @save-close="save" />

    <div v-if="!isLoading && schema" class="flex flex-col mt-4 justify-between items-start">
      <p class="flex justify-start font-bold mt-6">Data:</p>
      <p>{{ eventData }}</p>
      <p>{{ activeResourceKind }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue'
import { vanillaRenderers } from '@jsonforms/vue-vanilla'
import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify'
import { defineEmits, defineProps, markRaw, onMounted, ref, watch } from 'vue'
import SchemaService from '../services/SchemaService.ts'
import { useResourceKindStore } from '../store/useResourceKind.ts'
import FormButtons from './layout/FormButtons.vue'


const resourceKindStore = useResourceKindStore()
const data = ref({ api_version: null });
const eventData = ref()
const schema = ref(null)
const uischema = ref(null)
const isLoading = ref(true)

const uiSchemas = {
  InteractionsInstance: {
    "required": [
      "spec"
    ],
    "properties": {
      "spec": {
        "type": "object",
        "x-quandago-resource-kind": "InteractionsInstance",
        "x-quandago-resource-version": "interactions/v1",
        "required": [
          "capacity",
          "classic",
          "domain",
          "tenant_guid",
          "tenant_shortname"
        ],
        "properties": {
          "capacity": {
            "type": "integer"
          },
          "classic": {
            "type": "boolean"
          },
          "domain": {
            "type": "string",
            "maxLength": 255,
            "minLength": 3,
            "pattern": "(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\\.)+[a-zA-Z]{2,63}$)"
          },
          "tenant_guid": {
            "type": "string",
            "minLength": 32,
            "maxLength": 32,
            "pattern": "^[0-9a-f]+$"
          },
          "tenant_shortname": {
            "type": "string",
            "minLength": 1,
            "maxLength": 16,
            "pattern": "^[a-z]+$"
          }
        }
      }
    }
  },
  Trunk: {
    "required": [
      "spec"
    ],
    "properties": {
      "spec": {
        "type": "object",
        "x-quandago-resource-kind": "Trunk",
        "x-quandago-resource-version": "trunk/v1",
        "required": [
          "concurrent_channels",
          "allowed_addresses",
          "destinations"
        ],
        "properties": {
          "concurrent_channels": {
            "type": "integer"
          },
          "allowed_addresses": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "cidr_block"
              ],
              "properties": {
                "cidr_block": {
                  "type": "string",
                  "x-go-type": "netip.Prefix"
                }
              }
            }
          },
          "destinations": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "host",
                "port"
              ],
              "properties": {
                "host": {
                  "type": "string"
                },
                "port": {
                  "type": "integer",
                  "format": "uint16"
                },
                "sips": {
                  "type": "boolean",
                  "default": false
                },
                "transport": {
                  "type": "string",
                  "enum": [
                    "UDP",
                    "TCP",
                    "tls"
                  ],
                  "default": "UDP"
                },
                "user": {
                  "type": "string",
                  "nullable": true
                }
              }
            }
          }
        }
      }
    }
  },
  SessionBorderController: {
    "required": [
      "spec"
    ],
    "properties": {
      "spec": {
        "type": "object",
        "x-quandago-resource-kind": "SessionBorderController",
        "x-quandago-resource-version": "sbc/v1"
      }
    }
  },
  TransformationRules: {
    "required": [
      "spec"
    ],
    "properties": {
      "spec": {
        "type": "object",
        "x-quandago-resource-kind": "TransformationRules",
        "x-quandago-resource-version": "transformationRules/v1",
        "properties": {
          "inbound": {
            "type": "object",
            "properties": {
              "caller": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [
                    "match_expr",
                    "replace_expr"
                  ],
                  "properties": {
                    "match_expr": {
                      "type": "string"
                    },
                    "replace_expr": {
                      "type": "string"
                    }
                  }
                }
              },
              "callee": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [
                    "match_expr",
                    "replace_expr"
                  ],
                  "properties": {
                    "match_expr": {
                      "type": "string"
                    },
                    "replace_expr": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "outbound": {
            "type": "object",
            "properties": {
              "caller": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [
                    "match_expr",
                    "replace_expr"
                  ],
                  "properties": {
                    "match_expr": {
                      "type": "string"
                    },
                    "replace_expr": {
                      "type": "string"
                    }
                  }
                }
              },
              "callee": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [
                    "match_expr",
                    "replace_expr"
                  ],
                  "properties": {
                    "match_expr": {
                      "type": "string"
                    },
                    "replace_expr": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  InboundRoutingRule: {
    "required": [
      "spec"
    ],
    "properties": {
      "spec": {
        "type": "object",
        "x-quandago-resource-kind": "InboundRoutingRule",
        "x-quandago-resource-version": "inboundRoutingRule/v1",
        "required": [
          "prefix"
        ],
        "properties": {
          "prefix": {
            "type": "string",
            "pattern": "^[0-9+]+$"
          }
        }
      }
    }
  },
  OutboundRoutingRule: {
    "required": [
      "spec"
    ],
    "properties": {
      "spec": {
        "type": "object",
        "x-quandago-resource-kind": "OutboundRoutingRule",
        "x-quandago-resource-version": "outboundRoutingRule/v1",
        "required": [
          "routing_tag"
        ],
        "properties": {
          "routing_tag": {
            "type": "string"
          },
          "prefix": {
            "type": "string",
            "pattern": "^[0-9+]+$",
            "nullable": true
          }
        }
      }
    }
  }
};

const activeResourceKind = ref(resourceKindStore.activeResourceKind)

const renderers = markRaw([
  ...extendedVuetifyRenderers,
  ...vanillaRenderers
]);
const frozenRenderers = Object.freeze(renderers)


console.log('form spec name:', resourceKindStore.activeResourceKind)
console.log('current store schema:', resourceKindStore.currentSchema)

const onChange = (event: JsonFormsChangeEvent) => {
  data.value = event.data
  eventData.value = event.data
}

const emit = defineEmits(['saveData', 'closeModal'])

// generate a ui schema

const generateUISchema = (schema) => {
  // Check if the schema has properties
  if (!schema || !schema.properties) {
    console.error('Schema is invalid:', schema);
    return null; // or handle as needed
  }

  const uiElements = Object.keys(schema.properties).map((propertyKey) => {
    const propertySchema = schema.properties[propertyKey];

    // Check if the property is a nested object
    if (propertySchema.type === 'object' && propertySchema.properties) {
      const nestedElements = Object.keys(propertySchema.properties).map((nestedKey) => {
        return {
          type: 'Control',
          scope: `#/properties/${propertyKey}/properties/${nestedKey}`,
        };
      });

      return {
        type: 'Control',
        label: propertyKey,
        elements: nestedElements,
      };
    } else {
      // For regular properties
      return {
        type: 'Control',
        scope: `#/properties/${propertyKey}`,
      };
    }
  });

  // Debugging UI Elements
  console.log('Generated UI Elements:', uiElements);

  return {
    type: 'VerticalLayout',
    elements: uiElements,
  };
};



watch(
  () => resourceKindStore.activeResourceKind,
  async (newKind) => {
    // Fetch the schema dynamically when the active resource kind changes
    isLoading.value = true;
    await fetchSchema(); // This calls the function that fetches the schema based on the active resource kind
    isLoading.value = false;
  }
);


const fetchSchema = async () => {
  try {
    const schemaKey = 'CreateResource';

    // Fetch and resolve schema
    schema.value = await SchemaService.getSchemaByKey(schemaKey);

    // Log the allOf arrays to see the structure
    console.log('allOf[1]', schema.value.allOf[1]); // Additional properties
    console.log('allOf[0]', schema.value.allOf[0]); // Base properties and oneOf schemas


    // Select the correct UI schema based on the active resource kind
    const activeSchema = uiSchemas[activeResourceKind.value];

    if (!activeSchema) {
      console.warn(`No schema found for ${activeResourceKind.value}`);
    } else {
      // Use the selected schema to generate the UI
      uischema.value = generateUISchema(activeSchema);
    }

    console.log('Using schema:', activeSchema);
    // Get the oneOf schemas from allOf[0]
    const oneOfSchemas = schema.value.allOf[0].oneOf || [];

    console.log('OneOfSchema', oneOfSchemas);
    console.log('InteractionsInstance spec', oneOfSchemas[0]);
    console.log('Trunk spec', oneOfSchemas[1]);
    console.log('SessionBorderController spec', oneOfSchemas[2]);
    console.log('TransformationRules spec', oneOfSchemas[3]);
    console.log('inboundRoutingRule spec', oneOfSchemas[4]);
    console.log('OutboundRoutingRule spec', oneOfSchemas[5]);

    // Find the matching schema based on x-quandago-resource-kind
    const matchingSpec = oneOfSchemas.find(
      (spec) => spec.properties?.spec['x-quandago-resource-kind'] === activeResourceKind.value);

    console.log('specmatch', matchingSpec)

    if (!matchingSpec) {
      console.warn(`No matching spec found for ${activeResourceKind.value}`);
      return;
    }

    // Extract properties from both allOf[0] and allOf[1]
    const baseProperties = schema.value.allOf[0].properties || {};
    const additionalProperties = schema.value.allOf[1].properties || {};
    console.log('base:', baseProperties, 'additional', additionalProperties)

    // Extract the properties of the matched spec
    const resourceKindSpec = matchingSpec.properties.spec.properties || {};
    console.log('spec to be merged:', resourceKindSpec);

    // Merge the base, additional, and resourceKindSpec properties
    const mergedSchema = {
      ...schema.value.allOf[1], // Additional properties from allOf[1]
      properties: {
        ...baseProperties, // Base properties from allOf[0]
        ...additionalProperties, // Additional properties from allOf[1]
        ...activeSchema.properties, // Matched spec properties
      },
    };

    console.log('Merged schema:', mergedSchema);

    // Generate the UI schema for the merged schema
    uischema.value = generateUISchema(mergedSchema);

    // Handle the api_version dynamically
    const handleApiVersionChange = (selectedVersion) => {
      const mapping = schema.value.allOf[0].discriminator.mapping;
      const refSchema = mapping[selectedVersion];
      const specSchemaKey = refSchema.split('/').pop();
      fetchSpecSchema(specSchemaKey);
    };

    // Listen to changes in api_version
    onMounted(() => {
      watch(() => data.value.api_version, (newValue) => {
        if (newValue) {
          handleApiVersionChange(newValue);
        }
      });
    });

    console.log('Final UI schema:', uischema.value);

  } catch (error) {
    console.error('Error fetching schema:', error);
  } finally {
    isLoading.value = false;
  }
};


const save = () => {
  emit('saveData', data.value)
  console.log('Saved data:', data.value)
  if (props.closeOnSave) {
    emit('closeModal')
  }
}

const props = defineProps({
  closeOnSave: {
    type: Boolean,
    default: true,
  },
  specSchema: Object
})

const cancel = () => {
  console.log('Cancelled')
  emit('closeModal')
}

onMounted(async () => {
  await fetchSchema()
  console.log('Mounted schema:', schema.value)
  if (resourceKindStore) {
    activeResourceKind.value = resourceKindStore.activeResourceKind
  }
})

</script>

<style>
@import '@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.css';
</style>
