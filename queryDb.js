import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the current directory
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log("Firebase Project ID:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkCollection() {
  try {
    const colRef = collection(db, "portfolio_works");
    const snapshot = await getDocs(colRef);
    console.log(`Found ${snapshot.size} documents in portfolio_works:`);
    snapshot.forEach(doc => {
      console.log("- ID:", doc.id, JSON.stringify(doc.data(), null, 2));
    });
  } catch (error) {
    console.error("Error querying Firestore:", error);
  }
}

checkCollection();
