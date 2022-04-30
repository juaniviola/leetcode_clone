import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAcc from './online-compiler.json';

export default function firestore() {
  initializeApp({
    credential: cert(serviceAcc),
  });

  const db = getFirestore();

  return {
    async getProblem (id) {
      const docRef = await db.collection('problems').doc(id).get();
      return docRef._fieldsProto;
    },

    async getStatement (id) {
      const docRef = await db.collection('statements').doc(id).get();
      return docRef._fieldsProto;
    },

    async getProblemList () {
      const docRef = await db.collection('statements').get();
      return docRef;
    },
  };
}
