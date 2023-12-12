import admin from 'firebase-admin';

import { readFileSync } from 'fs';
import path from 'path';
import process from 'process';
const firebaseAdminConfig = JSON.parse(
  readFileSync(
    path.join(process.cwd() + '/auth/firebase/firebaseAdminConfig.json'),
  ),
);

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig),
});

export default admin;
