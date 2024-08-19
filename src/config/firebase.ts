import admin, { ServiceAccount } from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const { private_key } = JSON.parse(process.env.privateKey as string);


const credentials = {
    "type": process.env.type,
    "project_id": process.env.projectId,
    "private_key_id": process.env.privateKeyId,
    private_key,
    "client_email": process.env.clientEmail,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url,
    "universe_domain": process.env.universe_domain,
}

const firebase = admin.initializeApp({
    credential: admin.credential.cert(credentials as ServiceAccount),
})

const firestore = firebase.firestore();

export default firestore