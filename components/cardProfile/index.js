import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import swal from 'sweetalert2';

import styles from '../../styles/CardProfile.module.css';

const CardProfile = props => {
  const router = useRouter();
  const [data, setData] = useState(props);
  const isError = data.skills;
  const [photo, setPhoto] = useState(`${process.env.NEXT_PUBLIC_API_URL}users/${props.photo}`);

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

  const onChat = e => {
    e.preventDefault();
    const body = {
      workerId: `${props.id}`
    };
    swal
      .fire({
        title: 'Are you sure?',
        text: 'To Hiring',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes Hire'
      })
      .then(result => {
        if (result.isConfirmed) {
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}chat`, body, {
              headers: {
                token: props.token
              }
            })
            .then(res => {
              swal
                .fire({
                  title: 'Success!',
                  text: 'Hire Success',
                  icon: 'success'
                })
                .then(() => {
                  router.push(`/home`);
                });
            })
            .catch(err => {
              swal
                .fire({
                  title: 'Error!',
                  text: 'error',
                  icon: 'error'
                })
                .then(() => {});
            });
        }
      });
  };
  return (
    <>
      <section className={`container-fluid `}>
        <div className={`row ${styles.mainContent}`}>
          <div className={styles.divImage}>
            <Image
              className={styles.image}
              // src="/profile-default.png"
              src={photo}
              onError={() => setPhoto('/profile-default.png')}
              width={105}
              height={105}
            />
          </div>
          <div className={styles.detailUser}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.profession}>{props.jobDesk}</div>
            <div className={styles.divLocation}>
              <div style={{ marginRight: '5px' }}>
                <Image className={styles} src="/mapIcon.svg" width={15} height={17} />
              </div>
              <div className={styles.address}>{props.workplace}</div>
            </div>
            <div className={styles.work}>Freelancer</div>
            <div className={styles.work}>{props.about}</div>
            <div className={styles.divButtton}>
              {props.id == props.idUser ? (
                <>
                  <Link href={`/profile/edit`}>
                    <button className={styles.buttonHire}>
                      <div>Edit Profile</div>
                    </button>
                  </Link>
                  <button onClick={e => onLogout(e)} className={styles.buttonLogout}>
                    <div>Logout</div>
                  </button>
                </>
              ) : props.level == 1 ? (
                <button onClick={e => onChat(e)} className={styles.buttonHire}>
                  <div>Hire</div>
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <div className={styles.contentSkil}>
              <div className={styles.mainSkill}>Skill</div>
              <div className={styles.divSkill}>
                {!isError ? (
                  <div></div>
                ) : (
                  props.skills.map((e, i) => (
                    <div key={i} className={styles.skill}>
                      {e}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardProfile;
