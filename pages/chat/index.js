import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import jwtDecode from 'jwt-decode';

import styles from '../../styles/Chats.module.css';
import Left from '../../components/chat/left';
import Right from '../../components/chat/right';

export async function getServerSideProps(context) {
  // const { id } = context.query;
  const { token, idUser } = context.req.cookies;
  let getLevel;
  if (token) {
    const { level } = jwtDecode(token);
    getLevel = level;
  }
  const apiUsers = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}listuser`,
        headers: {
          token
        }
      });
      return {
        data: response.data,
        error: false
      };
    } catch (error) {
      return {
        data: [],
        error: true
      };
    }
  };
  return {
    props: {
      data: [],
      getUsers: await apiUsers(),
      idUser,
      getLevel,
      token
    }
  };
}

const Chat = props => {
  const [data, setData] = useState(props.getUsers.data.data);
  console.log(data);

  return (
    <>
      <Head>
        <title>Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`container-fluid ${styles.section}`}>
        <div className={`row ${styles.mainContent}`}>
          <div className={styles.background}></div>
          <div className={`row ${styles.content}`}>
            <div className="col-md-1"></div>
            <div className={`col-md-3 col-12`}>
              {/* ------------ */}
              {data ? (
                <Left token={props.token} idUser={props.idUser} companyId={data.company_id} />
              ) : (
                <>
                  <div className={styles.leftContent}>
                    <div className={styles.divChat}>
                      <h4 style={{ marginLeft: '20px', paddingBottom: '5px' }}>Chat</h4>
                    </div>
                    <div className={`row ${styles.leftMain}`}>
                      <div className={`col-3 ${styles.divLeftImage}`}>
                        {/* <Image
                          className={styles.leftImage}
                          src="/profile-default.png"
                          // src={photo}
                          // onError={() => setPhoto('/profile-default.png')}
                          width={50}
                          height={50}
                        /> */}
                      </div>
                      <div className={`col-9 ${styles}`}>
                        {/* <div style={{ cursor: 'pointer', fontSize: '19px' }}>{users.company}</div>
                        <div style={{ color: '#5e50a1', cursor: 'pointer' }}>message</div> */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-7 col-12 ">
              {/* --------------- */}
              {data ? (
                <Right token={props.token} idUser={props.idUser} companyId={data.company_id} chat={data.chat} />
              ) : (
                <>
                  <div className={styles.rightContent}>
                    <div className={`row ${styles}`}>
                      <div className={`col-md-1 ${styles.divRightImage}`}>
                        {/* <Image
                          className={styles.rightImage}
                          src="/profile-default.png"
                          // src={photo}
                          // onError={() => setPhoto('/profile-default.png')}
                          width={50}
                          height={50}
                        /> */}
                      </div>
                      <div className={`col-md-9 ${styles}`}>
                        {/* <div style={{ cursor: 'pointer', fontSize: '20px' }}>{users.company}</div>
                        <div style={{ color: '#5e50a1', cursor: 'pointer' }}>online</div> */}
                      </div>
                    </div>
                    <div className={styles.rightMain}>{/* <div className={styles.ballon}>{props.chat}</div> */}</div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

Chat.layout = 'MainLayout';

export default Chat;
