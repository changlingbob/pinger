import * as React from 'react';

import { Button } from '@components/button';
import { useFirebase } from '@components/firebase/firebase';

import styles from './login.module.scss';
import classNames from 'classnames';

export interface ILoginProps {
  className?: string;
}

export const Login: React.FC<ILoginProps> = ({ className }) => {
  const { login, register } = useFirebase();
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [channel, setChannel] = React.useState('');
  const [message, setMessage] = React.useState('');

  return (
    <div className={classNames(className, styles.content)}>
      <input
        placeholder="Username"
        onChange={(ev) => {
          setUser(ev.target.value);
        }}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(ev) => {
          setPassword(ev.target.value);
        }}
      ></input>
      <input
        placeholder="Channel"
        onChange={(ev) => {
          setChannel(ev.target.value);
        }}
      ></input>

      <Button
        className={styles.button}
        onClick={() => {
          if (channel) {
            login(user, password, channel).then((msg) => setMessage(msg));
          } else {
            setMessage('Enter a channel');
          }
        }}
      >
        Log in
      </Button>
      <Button
        className={styles.button}
        onClick={() => {
          if (channel) {
            register(user, password, channel).then((msg) => setMessage(msg));
          } else {
            setMessage('Enter a channel');
          }
        }}
      >
        Register
      </Button>
      {message}
    </div>
  );
};
