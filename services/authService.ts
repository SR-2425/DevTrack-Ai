import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GithubAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";

// These should ideally be in process.env, but we provide a structure for the user.
// The app will fallback to demo mode if these are not valid.
const firebaseConfig = {
  apiKey: "AIzaSyDummyKey_ReplaceWithRealOne",
  authDomain: "devpulse-auth.firebaseapp.com",
  projectId: "devpulse-auth",
  storageBucket: "devpulse-auth.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Ensure app is only initialized once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
const provider = new GithubAuthProvider();

export const loginWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('user_role', 'individual');
    localStorage.setItem('data_mode', 'live');
    return user;
  } catch (error: any) {
    console.error("Firebase Auth Error:", error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  await signOut(auth);
  localStorage.removeItem('user_role');
  localStorage.removeItem('data_mode');
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};