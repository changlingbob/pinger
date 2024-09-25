import * as React from 'react';

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  QuerySnapshot,
} from 'firebase/firestore';

export type FirebaseData = {
  uuid: string;
  send: (type: string) => void;
  data: QuerySnapshot<DocumentData, DocumentData> | undefined;
  login: (user: string, password: string, chan: string) => Promise<string>;
  register: (user: string, password: string, chan: string) => Promise<string>;
  logout: () => void;
  channel: string;
};

export const FirebaseContext = React.createContext<FirebaseData>(
  {} as FirebaseData
);

export const FirebaseProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [uuid, setUuid] = React.useState<string>('');
  const [channel, setChannel] = React.useState<string>(
    localStorage.getItem('channel') || ''
  );
  const [data, setData] =
    React.useState<QuerySnapshot<DocumentData, DocumentData>>();
  const lock = React.useRef<boolean>();
  lock.current = false;
  const fetch = React.useRef<NodeJS.Timeout>();

  const firebaseConfig = {
    apiKey: 'AIzaSyBYhKAs5xq-lcn7wqIWes1gqO00mLnk6Vc',
    authDomain: 'pinger-db5a9.firebaseapp.com',
    projectId: 'pinger-db5a9',
    storageBucket: 'pinger-db5a9.appspot.com',
    messagingSenderId: '434950006445',
    appId: '1:434950006445:web:5bdc3f0a8a9f4f69e30824',
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  const getData = () => {
    if (fetch.current) {
      clearTimeout(fetch.current);
    }
    getDocs(collection(db, 'pings')).then((pings) => {
      setData(pings);
    });
    fetch.current = setTimeout(getData, 60 * 1000);
  };

  const login = (user: string, password: string, chan: string) => {
    setChannel(chan);
    localStorage.setItem('channel', chan);

    return signInWithEmailAndPassword(auth, user, password)
      .then(() => '')
      .catch(() => 'Login failed');
  };

  const register = (user: string, password: string, chan: string) => {
    setChannel(chan);
    localStorage.setItem('channel', chan);

    return createUserWithEmailAndPassword(auth, user, password)
      .then(() => '')
      .catch(() => 'Registration failed');
  };

  onAuthStateChanged(auth, (user) => {
    if (!uuid && user) {
      setUuid(user.uid);
      getData();
    }
  });

  const logout = () => {
    signOut(auth).then(() => {
      setUuid('');
      setData(undefined);
    });
  };

  const send = (type: string) => {
    if (lock.current === false) {
      addDoc(collection(db, 'pings'), {
        channel,
        ping: type,
        time: new Date(),
        uuid,
      });
      lock.current = true;
      setTimeout(() => {
        lock.current = false;
      }, 1000);
      getData();
    }
  };

  return (
    <FirebaseContext.Provider
      value={{ uuid, data, send, login, channel, logout, register }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => React.useContext(FirebaseContext);
