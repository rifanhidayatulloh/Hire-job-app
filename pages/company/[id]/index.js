import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';

import styles from '../../../styles/Company.module.css';

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { token, idUser } = context.req.cookies;
  let getLevel;
  if (token) {
    const { level } = jwtDecode(token);
    getLevel = level;
  }

  const apiUsersId = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}users/${id}`,
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
      getUsers: await apiUsersId()
    }
  };
}

const Company = props => {
  const router = useRouter();
  const [data, setData] = useState(props.getUsers.data.data);
  const [photo, setPhoto] = useState(`${process.env.NEXT_PUBLIC_API_URL}users/${data.photo}`);

  const onLogout = e => {
    e.preventDefault();
    swal
      .fire({
        title: 'Are you sure?',
        text: 'Logout',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes Logout'
      })
      .then(result => {
        if (result.isConfirmed) {
          document.cookie = 'token=; path=/';
          document.cookie = 'idUser=; path=/';
          router.push('/login');
          swal.fire('Logout', 'success');
        }
      });
  };

  return (
    <>
      <Head>
        <title>Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`container-fluid ${styles.container}`}>
        <div className={`container ${styles.section}`}>
          <div className={styles.content}>
            {/* -----------top--------------- */}
            <div className={styles.topContent}></div>

            {/* --------------------------------------------------- */}
            <div className={styles.divImage}>
              <Image
                className={styles.image}
                // src="/profile-default.png"
                src={photo}
                onError={() => setPhoto('/profile-default.png')}
                width={150}
                height={150}
              />
            </div>

            {/* -----------------bottom--------------- */}
            <div className={`row ${styles.bottomContent}`}>
              <div className={`col-7 ${styles.mainContent}`}>
                <h1 className={styles.name}>{data.company}</h1>
                <h5 className={styles.name}>{data.field_company}</h5>
                <div className={styles.divLocation}>
                  <div className={styles.location}>
                    <Image className={styles} src="/mapIcon.svg" width={17} height={20} />
                  </div>
                  <div className={styles.address}>{data.address}</div>
                </div>
                <div className={styles.divAbout}>
                  <p>{data.about}</p>
                </div>
                <div className={`${styles.divButton}`}>
                  <Link href={`/company/edit`}>
                    <button className={styles.buttonEdit}>
                      <div>Edit Profile</div>
                    </button>
                  </Link>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <button onClick={e => onLogout(e)} className={styles.buttonLogout}>
                    <div>Logout</div>
                  </button>
                </div>
                <div className={styles.divIcon}>
                  <div className={styles.divLocation}>
                    <div className={styles.location}>
                      <Image className={styles} src="/email.svg" width={22} height={20} />
                    </div>
                    <div className={styles.address}>{data.email}</div>
                  </div>
                  <div className={styles.divLocation}>
                    <div className={styles.location}>
                      <Image className={styles} src="/instagram.svg" width={22} height={20} />
                    </div>
                    <div className={styles.address}>{data.intagram}</div>
                  </div>
                  <div className={styles.divLocation}>
                    <div className={styles.location}>
                      <Image className={styles} src="/phone.svg" width={22} height={19} />
                    </div>
                    <div className={styles.address}>{data.phone}</div>
                  </div>
                  <div className={styles.divLocation}>
                    <div className={styles.location}>
                      <Image className={styles} src="/linkedin.svg" width={22} height={19} />
                    </div>
                    <div className={styles.address}>{data.linkedin}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Company.layout = 'MainLayout';

export default Company;
