import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB_BvwjRsNMRFXbpDmrLf_Aj5QHANXUNb0",
  authDomain: "vakim-aab7f.firebaseapp.com",
  databaseURL: "https://vakim-aab7f-default-rtdb"
};

const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
