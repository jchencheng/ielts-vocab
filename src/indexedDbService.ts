import { UserData } from './types';

const DB_NAME = 'ielts-pwa-db';
const DB_VERSION = 1;
const STORE_NAME = 'user-data';
const STORE_KEY = 'user-data-key';

class IndexedDbService {
  private dbPromise: Promise<IDBDatabase>;

  constructor() {
    this.dbPromise = this.initDb();
  }

  private async initDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target);
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }

  async getData(): Promise<UserData> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(STORE_KEY);

      request.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result;
        resolve(data);
      };

      request.onerror = (event) => {
        console.error('Error getting data from IndexedDB:', event.target);
        reject(new Error('Failed to get data from IndexedDB'));
      };
    });
  }

  async saveData(data: UserData): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, STORE_KEY);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error saving data to IndexedDB:', event.target);
        reject(new Error('Failed to save data to IndexedDB'));
      };
    });
  }

  async clearData(): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error clearing data from IndexedDB:', event.target);
        reject(new Error('Failed to clear data from IndexedDB'));
      };
    });
  }

  async removeData(): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(STORE_KEY);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error removing data from IndexedDB:', event.target);
        reject(new Error('Failed to remove data from IndexedDB'));
      };
    });
  }
}

export const indexedDbService = new IndexedDbService();
