import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Chats.module.css';
import axios from 'axios';

export default function Right(props) {
  const [users, setUsers] = useState([]);

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
      <div className={styles.rightContent}>
        <div className={`row ${styles.divMainRight}`}>
          <div className={`col-1 ${styles.divRightImage}`}>
            <Image
              className={styles.rightImage}
              src="/profile-default.png"
              // src={photo}
              // onError={() => setPhoto('/profile-default.png')}
              width={50}
              height={50}
            />
          </div>
          <div className={`col-9 ${styles}`}>
            <div style={{ cursor: 'pointer', fontSize: '20px' }}>{users.company}</div>
            <div style={{ color: '#5e50a1', cursor: 'pointer' }}>online</div>
          </div>
        </div>
        <div className={styles.rightMain}>
          <div className={styles.ballon}>{props.chat}</div>
        </div>
      </div>
    </>
  );
}
