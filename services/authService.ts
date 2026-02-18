export interface MockUser {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  uid: string;
}

const STORAGE_KEY = 'devtrack_user';

export const loginWithGitHub = async () => {
  const mockUser: MockUser = {
    displayName: "Demo Developer",
    photoURL: "https://picsum.photos/seed/dev/100/100",
    email: "hello@devtrack.io",
    uid: "demo-user-1"
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
  localStorage.setItem('user_role', 'individual');
  localStorage.setItem('data_mode', 'live');
  
  window.dispatchEvent(new Event('auth-state-changed'));
  return mockUser;
};

export const logoutUser = async () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('user_role');
  localStorage.removeItem('data_mode');
  window.dispatchEvent(new Event('auth-state-changed'));
};

export const subscribeToAuthChanges = (callback: (user: MockUser | null) => void) => {
  const checkAuth = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    callback(saved ? JSON.parse(saved) : null);
  };

  window.addEventListener('auth-state-changed', checkAuth);
  checkAuth();
  return () => window.removeEventListener('auth-state-changed', checkAuth);
};

export const auth = {
  get currentUser() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }
};
