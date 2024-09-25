import * as React from 'react';

import { Button } from '@components/button';
import { useFirebase } from '@components/firebase/firebase';

import styles from './controls.module.scss';
import classNames from 'classnames';

export interface IControlsProps {
  className?: string;
}

export const Controls: React.FC<IControlsProps> = ({ className }) => {
  const { send } = useFirebase();

  return (
    <div className={classNames(className, styles.content)}>
      <Button className={styles.button} onClick={() => send('ping')}>
        Ping
      </Button>
      <Button className={styles.button} onClick={() => send('big ping')}>
        Big Ping
      </Button>
    </div>
  );
};
