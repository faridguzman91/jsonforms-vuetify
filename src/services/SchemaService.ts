import $RefParser from '@apidevtools/json-schema-ref-parser';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../schema/schema.json'; // Importing the local schema file directly

export default class SchemaService {
  // Using the local schema directly, so no need for BASE_URL
  private static SCHEMA = schema;

  // Since the schema is already loaded, we just return it
  public static async fetchSchema(): Promise<any> {
    try {
      // Return the statically imported schema directly
      return this.SCHEMA;
    } catch (error) {
      console.error('Error fetching schema:', error);
      throw error;
    }
  }

  // Resolve $refs in the local schema if necessary
  public static async resolveSchema(schema: any): Promise<any> {
    try {
      const resolvedSchema = await $RefParser.dereference(schema, {
        dereference: {
          circular: 'ignore', // Prevent circular references
          maxDepth: 10,
        },
      });
      return resolvedSchema;
    } catch (error) {
      console.error('Error resolving schema references:', error);
      throw error;
    }
  }

  // Fetch a schema by its key from the components in the local schema
  public static async getSchemaByKey(schemaKey: string): Promise<any> {
    try {
      // The full schema is already loaded, so no need to fetch it again
      const fullSchema = this.SCHEMA;

      // Use AJV to resolve $ref within the local schema
      const ajv = new Ajv({ allErrors: true });
      addFormats(ajv);

      // Add the entire schema to AJV for reference resolution
      ajv.addSchema(fullSchema, 'rootSchema');

      // Now extract the schema with the provided key
      const schema = fullSchema?.components?.schemas?.[schemaKey];

      if (!schema) {
        throw new Error(`Schema with key "${schemaKey}" not found.`);
      }

      // Resolve any $refs in the schema
      const resolvedSchema = await this.resolveSchema(fullSchema);
      console.log('Resolved schema:', resolvedSchema?.components?.schemas?.[schemaKey]);

      return resolvedSchema?.components?.schemas?.[schemaKey];
    } catch (error) {
      console.error(`Error resolving schema by key "${schemaKey}":`, error);
      throw error;
    }
  }

  // This method is no longer necessary for a local schema, but kept if you need to resolve external URLs in the future
  public static async fetchSchemaByUrl(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch schema from URL: ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching schema from URL "${url}":`, error);
      throw error;
    }
  }
}


