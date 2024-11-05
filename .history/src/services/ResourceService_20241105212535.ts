import type { Resource } from './types';

const API_URL = '/api';

const ResourceService = {
  async getResourcesByKind(kind: string): Promise<Resource[]> {
    try {
      const response = await fetch(`${API_URL}/resources/${kind}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.every(isValidResource)) {
          return data;
        } else {
          console.error('Invalid API response structure:', data);
          return [];
        }
      } else {
        console.error('Request failed with status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  async createResource(
    kind: string,
    resourceData: Resource
  ): Promise<Resource | null> {
    try {
      const response = await fetch(`${API_URL}/resources/${kind}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceData),
      });
      if (response.ok) {
        const data = await response.json();
        if (isValidResource(data)) {
          return data;
        } else {
          console.error('Invalid API response structure:', data);
          return null;
        }
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error creating resource:', error);
      return null;
    }
  },

  async getResourceById(kind: string, id: string): Promise<Resource | null> {
    try {
      const response = await fetch(`${API_URL}/resources/${kind}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (isValidResource(data)) {
          return data;
        } else {
          console.error('Invalid API response structure:', data);
          return null;
        }
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching resource:', error);
      return null;
    }
  },

  async getResourceAssociations(
    kind: string,
    id: string,
    targetKind: string
  ): Promise<Resource[]> {
    try {
      const response = await fetch(
        `${API_URL}/resources/${kind}/${id}/associations/${targetKind}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.every(isValidResource)) {
          return data;
        } else {
          console.error('Invalid API response structure:', data);
          return [];
        }
      } else {
        console.error('Request failed with status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching resource associations:', error);
      return [];
    }
  },

  async deleteResource(kind: string, id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/resources/${kind}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return true;
      } else {
        console.error('Request failed with status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      return false;
    }
  },

  async getResourceStatus(kind: string, id: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}/resources/${kind}/${id}/status`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching resource status:', error);
      return null;
    }
  },

  async getAllResources(kind: string, id: string): Promise<Resource[]> {
    try {
      const response = await fetch(
        `${API_URL}/resources/${kind}/${id}/resources`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.every(isValidResource)) {
          return data;
        } else {
          console.error('Invalid API response structure:', data);
          return [];
        }
      } else {
        console.error('Request failed with status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching all resources:', error);
      return [];
    }
  },

  async updateResource(
    kind: string,
    id: string,
    resourceData: Partial<Resource>
  ): Promise<Resource | null> {
    try {
      const response = await fetch(`${API_URL}/resources/${kind}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceData),
      });
      if (response.ok) {
        const data = await response.json();
        if (isValidResource(data)) {
          return data;
        } else {
          console.error('Invalid API response structure:', data);
          return null;
        }
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error updating resource:', error);
      return null;
    }
  },

  async updateResourceStatus(
    kind: string,
    id: string,
    statusData: any
  ): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}/resources/${kind}/${id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(statusData),
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error updating resource status:', error);
      return null;
    }
  },

  async getResourceEvents(kind: string, id: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${API_URL}/resources/${kind}/${id}/events`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Request failed with status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching resource events:', error);
      return [];
    }
  },

  async createResourceEvent(
    kind: string,
    id: string,
    eventData: any
  ): Promise<any | null> {
    try {
      const response = await fetch(
        `${API_URL}/resources/${kind}/${id}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error creating resource event:', error);
      return null;
    }
  },
};

// Validate resource structure

function isValidResource(data: any): data is Resource {
  // Basic checks common to all resource types
  const baseValidation =
    typeof data === 'object' && // Check that data is an object
    data !== null && // Ensure data is not null
    typeof data.account_id === 'string' &&
    typeof data.activated_at === 'string' && // Ensure activated_at is a string
    typeof data.api_version === 'string' &&
    (typeof data.description === 'string' || data.description === null) &&
    (typeof data.display_name === 'string' || data.display_name === null) && // Adjust for display_name
    typeof data.environment === 'string' && // Ensure environment is a string
    typeof data.id === 'string' &&
    typeof data.kind === 'string' &&
    typeof data.name === 'string' &&
    typeof data.revision === 'number' &&
    typeof data.updated_at === 'string' &&
    (data.refs === null || typeof data.refs === 'object') && // Allow refs to be null or an object
    typeof data.tags === 'object' &&
    Object.values(data.tags).every((value) => typeof value === 'string'); // Validate tags

  if (!baseValidation) {
    return false;
  }

  // Specific validation based on the kind of resource
  switch (data.kind) {
    case 'SessionBorderController':
    case 'InteractionsInstance':
      return (
        typeof data.spec === 'object' &&
        data.spec !== null && // Ensure spec is not null
        typeof data.spec.domain === 'string' && // Validate domain
        typeof data.spec.classic === 'boolean' && // Validate classic
        typeof data.spec.capacity === 'number' &&
        typeof data.spec.tenant_guid === 'string' && // Validate tenant_guid
        typeof data.spec.tenant_shortname === 'string' // Validate tenant_shortname
      );

    case 'OutboundRoutingRule':
      return (
        typeof data.spec === 'object' &&
        data.spec !== null && // Ensure spec is not null
        typeof data.spec.prefix === 'string' && // Validate prefix
        typeof data.spec.routing_tag === 'string' // Validate routing_tag for outbound
      );

    case 'InboundRoutingRule':
      return (
        typeof data.spec === 'object' &&
        data.spec !== null && // Ensure spec is not null
        typeof data.spec.prefix === 'string' // Validate prefix (inbound has no routing_tag)
      );

    default:
      // If the kind is unrecognized, return false
      return false;
  }
}

export default ResourceService;
