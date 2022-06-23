import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Chats.module.css';
import axios from 'axios';

export default function Left(props) {
  const [users, setUsers] = useState([]);
  const [photo, setPhoto] = useState(`${process.env.NEXT_PUBLIC_API_URL}users/${users.photo}`);
  // console.log(users);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}users/${props.companyId}`, {
        headers: {
          token: props.token
        }
      })
      .then(response => {
        // console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.leftContent}>
        <div className={styles.divChat}>
          <h4 style={{ marginLeft: '20px', paddingBottom: '5px' }}>Chat</h4>
        </div>
        <div className={`row ${styles.leftMain}`}>
          <div className={`col-3 ${styles.divLeftImage}`}>
            <Image
              className={styles.leftImage}
              // src="/profile-default.png"
              src={photo}
              onError={() => setPhoto('/profile-default.png')}
              width={50}
              height={50}
            />
          </div>
          <div className={`col-9 ${styles}`}>
            <div style={{ cursor: 'pointer', fontSize: '19px' }}>{users.company}</div>
            <div style={{ color: '#5e50a1', cursor: 'pointer' }}>message</div>
          </div>
        </div>
      </div>
    </>
  );
}
