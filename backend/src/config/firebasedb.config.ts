// import * as firebase from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { firebaseServiceAccount } from './firebaseServiceAccount';

import firebase from 'firebase-admin'
import { Database } from 'firebase-admin/lib/database/database';
import { Logger } from './logger.config';

class FireBaseDB {
  private static instance: FireBaseDB;

  private firebaseRealtimeDB : Database;
  private firebaseApp: App;

  private constructor() {}

  static get(): FireBaseDB {
    if (!FireBaseDB.instance) {
      FireBaseDB.instance = new FireBaseDB();
    }
    return FireBaseDB.instance;
  }

  plug() : Database{
    try {
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseServiceAccount),
            databaseURL:
              'https://src-noti-default-rtdb.asia-southeast1.firebasedatabase.app',
          });
      
          this.firebaseRealtimeDB = firebase.database(this.firebaseApp);
          return this.firebaseRealtimeDB
    } catch (error) {
        Logger.log('error', `Connect to database error ${error}`);
    }
  }

}

const fireBaseDB: Database = FireBaseDB.get().plug();
export { fireBaseDB as FireBaseDB };
