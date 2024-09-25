import * as React from 'react';

import { Button } from '@components/button';
import { useFirebase } from '@components/firebase/firebase';

import styles from './header.module.scss';
import classNames from 'classnames';

export interface IHeaderProps {
  className?: string;
}

export const Header: React.FC<IHeaderProps> = ({ className }) => {
  const { logout, uuid } = useFirebase();

  return (
    <div className={classNames(className, styles.content)}>
      <div className={styles.title}>Pinger</div>
      {uuid && (
        <Button className={styles.logout} onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
};
