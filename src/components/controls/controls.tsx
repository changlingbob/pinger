import * as React from 'react';

import { Button } from '@components/button';

import styles from './controls.module.scss';
import classNames from 'classnames';

export interface IControlsProps {
  className?: string;
}

export const Controls: React.FC<IControlsProps> = ({ className }) => {
  console.log('ok');

  return (
    <div className={classNames(className, styles.content)}>
      <Button className={styles.button} onClick={() => alert(0)}>
        Ping
      </Button>
      <Button className={styles.button} onClick={() => alert(0)}>
        Big Ping
      </Button>
    </div>
  );
};
