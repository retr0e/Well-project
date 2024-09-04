import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDoUA0_sdR-FUkbQFx-mO1Fl-Tchv8t6pw',
  authDomain: 'well-project-e30c4.firebaseapp.com',
  projectId: 'well-project-e30c4',
  storageBucket: 'well-project-e30c4.appspot.com',
  messagingSenderId: '262236390007',
  appId: '1:262236390007:web:06543b689beb96f8727c72',
  measurementId: 'G-QLPFXJFD1L',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getAppointments = async () => {
  const appointmentsCollection = collection(db, 'appointments');
  const appointmentSnapshot = await getDocs(appointmentsCollection);
  const appointmentList = appointmentSnapshot.docs.map((doc) => doc.data());
  return appointmentList;
};
