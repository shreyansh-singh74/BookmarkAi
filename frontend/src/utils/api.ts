export const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
  
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Token expired or invalid - redirect to login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/sign-in';
      }
      throw new Error('Request failed');
    }
    
    return response.json();
  };