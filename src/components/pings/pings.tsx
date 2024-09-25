import * as React from 'react';

import { useFirebase } from '@components/firebase/firebase';
import { format } from 'date-fns';

import styles from './pings.module.scss';
import classNames from 'classnames';

export interface IPingsProps {
  className?: string;
}

export const Pings: React.FC<IPingsProps> = ({ className }) => {
  const { uuid, data, channel } = useFirebase();

  const elements: React.ReactElement[] = [];

  data?.forEach((doc) => {
    if (doc.data().channel === channel) {
      elements.push(
        <div
          key={`${doc.data().time.seconds}${doc.data().time.nanoseconds}`}
          className={classNames(styles.row, {
            [styles.own]: doc.data().uuid === uuid,
          })}
        >
          <span>
            {format(new Date(doc.data().time.seconds * 1000), 'do MMM HH:mm')}
          </span>
          <span>{doc.data().ping}</span>
        </div>
      );
    }
  });

  return (
    <div className={classNames(className, styles.content)}>{elements}</div>
  );
};
