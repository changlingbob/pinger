import * as React from 'react';

import styles from './header.module.scss';
import classNames from 'classnames';

export interface IHeaderProps {
  className?: string;
}

export const Header: React.FC<IHeaderProps> = ({ className }) => (
  <div className={classNames(className, styles.content)}>Pinger</div>
);
