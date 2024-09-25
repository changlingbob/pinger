import * as React from 'react';

import { Controls } from '@components/controls';
import { useFirebase } from '@components/firebase/firebase';
import { Header } from '@components/header';
import { Login } from '@components/login';
import { Pings } from '@components/pings';

import styles from './home.module.scss';

export const Home: React.FC = () => {
  const { uuid } = useFirebase();

  return (
    <div className={styles.content}>
      <Header />
      {uuid !== '' && (
        <>
          <Controls />
          <Pings />
        </>
      )}
      {!uuid && <Login />}
    </div>
  );
};
