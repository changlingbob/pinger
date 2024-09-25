import * as React from 'react';

import { Controls } from '@components/controls';
import { Header } from '@components/header';

import styles from './home.module.scss';

export const Home: React.FC = () => (
  <div className={styles.content}>
    <Header />
    <Controls />
  </div>
);
