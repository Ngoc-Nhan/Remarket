import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2jOYHepahCMqtw-6XZhoYQOw0S_Y9YAM",
  authDomain: "remaker-473905.firebaseapp.com",
  projectId: "remaker-473905",
  storageBucket: "remaker-473905.firebasestorage.app",
  messagingSenderId: "162064755179",
  appId: "1:162064755179:web:4837291aeb98f1131d51ae",
  measurementId: "G-E604GS021E",
};

// 🔥 Khởi tạo Firebase
export const app = initializeApp(firebaseConfig);

// 👤 Khởi tạo Authentication (đăng nhập Google)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// 📦 Nếu sau này bạn muốn upload ảnh avatar hay tin đăng
export const storage = getStorage(app);
