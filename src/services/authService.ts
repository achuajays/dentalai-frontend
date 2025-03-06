
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  id: number;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch('https://dentalai-production.up.railway.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    // Store user ID in localStorage for later use
    localStorage.setItem('userId', data.id.toString());
    return data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await fetch('https://dentalai-production.up.railway.app/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    // Store user ID in localStorage for later use
    localStorage.setItem('userId', data.id.toString());
    return data;
  },

  logout() {
    localStorage.removeItem('userId');
  },

  isLoggedIn() {
    return localStorage.getItem('userId') !== null;
  },

  getUserId() {
    return localStorage.getItem('userId');
  }
};
