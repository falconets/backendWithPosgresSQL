import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../admin.json'

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

const firestore = firebase.firestore();
console.log(typeof firestore, 'firestore' in process.env);

export default firestore