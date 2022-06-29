import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import jsCookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

import styles from '../../styles/Nav.module.css';

const Nav = () => {
  const id = jsCookie.get('idUser');
  const token = jsCookie.get('token');
  let level;
  if (token) {
    const getToken = jwtDecode(token);
    level = getToken.level;
  }

  const [backgroundColor, setBackgroundColor] = useState('');
  const [shadow, setShadow] = useState('');
  const [isDisplay, setIsDisplay] = useState('');
  const [isLogin, setIsLogin] = useState('none');

  // ------bg-------
  const changeBackground = () => {
    if (window.scrollY > 0) {
      setBackgroundColor('light');
      setShadow('shadow mb-5 bg-body rounded');
    } else {
      setBackgroundColor('');
      setShadow('');
    }
  };

  useEffect(() => {
    const token = jsCookie.get('token');
    if (!token) {
      setIsDisplay('none');
      setIsLogin('');
    }

    changeBackground();
    window.addEventListener('scroll', changeBackground);
  }, []);

  return (
    <>
      <nav className={`container-fluid fixed-top ${shadow}`} backgroundcolor={backgroundColor}>
        <div className={`row ${styles.navContent}`}>
          {/* Nav left */}
          <div className={`col-8 col-sm-6 ${styles.leftContent}`}>
            <div className={styles.divImage}>
              <Image style={{ cursor: 'pointer' }} src="/peworldIcon.png" width={100} height={35} />
            </div>
            <div className={styles.home}>
              <Link href="/home">
                <button className={styles.buttonHome}>
                  <h5>Home</h5>
                </button>
              </Link>
            </div>
          </div>

          {/* <div className={`col-4`}></div> */}

          {/* Nav Right */}
          <div className={`col-sm-6 col-4`}>
            <div className={`${styles.rightContent}`}>
              <div style={{ display: `${isLogin}` }} className={`${styles.divMasuk}`}>
                <Link href="/login">
                  <button className={styles.buttonMasuk}>Masuk</button>
                </Link>
              </div>
              <div style={{ display: `${isLogin}` }} className={`${styles.divDaftar}`}>
                <Link href="/register/worker">
                  <button className={styles.buttonDaftar}>Daftar</button>
                </Link>
              </div>
              {level === 0 ? (
                <div className={`${styles.divProfile}`} style={{ display: `${isDisplay}` }}>
                  <Link href={`/profile/${id}`}>
                    <button className={styles.buttonProfile}>Profile</button>
                  </Link>
                </div>
              ) : (
                <div className={`${styles.divProfile}`} style={{ display: `${isDisplay}` }}>
                  <Link href={`/company/${id}`}>
                    <button className={styles.buttonProfile}>Profile</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
