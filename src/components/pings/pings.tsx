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

  const content: [number, string, string][] = [];

  data?.forEach((doc) => {
    if (doc.data().channel === channel) {
      content.push([
        parseInt(
          `${doc.data().time.seconds}${`${doc.data().time.nanoseconds}`.slice(0, 3)}`,
          10
        ),
        doc.data().ping,
        doc.data().uuid,
      ]);
    }
  });

  return (
    <div className={classNames(className, styles.content)}>
      {content
        .sort((a, b) => b[0] - a[0])
        .map((item) => (
          <div
            key={`${item[0]}`}
            className={classNames(styles.row, {
              [styles.other]: item[2] !== uuid,
            })}
          >
            <span>{format(new Date(item[0]), 'do MMM HH:mm')}</span>
            <span>{item[1]}</span>
          </div>
        ))}
    </div>
  );
};
