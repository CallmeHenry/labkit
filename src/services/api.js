const API_BASE_URL = 'http://localhost:3500/api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Auth API calls
export const authAPI = {
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }

        return response.json();
    },

    signin: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        return response.json();
    },

    signout: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/signout`, {
            method: 'GET',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Signout failed');
        }

        return response.json();
    },
};

// Device API calls
export const deviceAPI = {
    getAllDevices: async () => {
        const response = await fetch(`${API_BASE_URL}/devices`, {
            method: 'GET',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch devices');
        }

        return response.json();
    },

    getDeviceById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch device');
        }

        return response.json();
    },

    createDevice: async (deviceData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/devices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create device');
        }

        return response.json();
    },

    updateDevice: async (id, deviceData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update device');
        }

        return response.json();
    },

  deleteDevice: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
      method: 'DELETE',
      headers: {
        'token': token,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete device');
    }
    
    return response.json();
  },
};

// User API calls
export const userAPI = {
  getAllUsers: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'token': token,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch users');
    }
    
    return response.json();
  },

  getUserById: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'token': token,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user');
    }
    
    return response.json();
  },

  updateUser: async (id, userData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }
    
    return response.json();
  },

  deleteUser: async (id) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'token': token,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete user');
    }
    
    return response.json();
  },
};