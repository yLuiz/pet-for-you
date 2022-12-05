import React, { useEffect, useState } from 'react';
import bus from '../../utils/bus';
import styles from './Message.module.css';

export default function Message() {
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {

    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false)
      }, 3000)
    })
    
  }, []);

  return visibility ? (
    <div className={`${styles.message} ${styles[type]}`}>
      { message }
    </div>
  ) : null;
}