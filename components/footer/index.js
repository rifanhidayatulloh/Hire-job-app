import React from 'react';
import Image from 'next/image';

import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={`container-fluid ${styles.footer}`}>
        <div className={`col ${styles.footerContent}`}>
          <div className={`row`}>
            <div className="col-1"></div>
            <div className={`col-10 ${styles.image}`}>
              <Image src="/putihPeworld.png" width={120} height={40} />
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className={`col-10 ${styles.text}`}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic dolorum laudantium inventore sint dolor
                obcaecati explicabo sed.
              </p>
            </div>
            <div className="col-1"></div>
          </div>
          <div className={`row`}>
            <div className={`col-1`}></div>
            <div className={`col-6 ${styles.end}`}>
              <p>2022 Pewworld. All right reserved</p>
            </div>
            <div className={`col-2 ${styles.end} ${styles.emaiPhone}`}>
              <p>Telepon</p>
            </div>
            <div className={`col-2 ${styles.end} ${styles.emaiPhone}`}>
              <p>Email</p>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
