import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../../styles/CardHouse.module.css';

const HouseCard = props => {
  const [data, setData] = useState(props);
  const isError = data.skills;
  const [photo, setPhoto] = useState(`${process.env.NEXT_PUBLIC_API_URL}users/${props.photo}`);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>

          {/* Start from this */}
          <div className={`col-10 ${styles.mainContent}`}>
            <div className={`row ${styles}`}>
              {/* left */}
              <div className={`col-md-2 col-3 ${styles.leftContent}`}>
                <Image
                  className={styles.image}
                  // src="/profile-default.png"
                  src={photo}
                  onError={() => setPhoto('/profile-default.png')}
                  width={105}
                  height={105}
                />
              </div>

              {/* Main */}
              <div className={`col-md-7 col-5  ${styles.centerContent}`}>
                <div>
                  <div className={styles.name}>
                    <div>{props.nama}</div>
                  </div>
                  <div className={styles.profession}>{!data.jobDesk ? <div></div> : data.jobDesk}</div>
                  <div className={styles.divLocation}>
                    <div style={{ marginRight: '5px' }}>
                      {!isError ? <></> : <Image className={styles} src="/mapIcon.svg" width={20} height={20} />}
                    </div>
                    <div className={styles.address}>{data.workplace}</div>
                  </div>

                  <div className={styles.divSkill}>
                    {!isError ? (
                      <div></div>
                    ) : (
                      data.skills.map((e, i) => (
                        <div key={i} className={styles.skill}>
                          {e}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* End */}
              <div className={`col-md-3  col-4 ${styles.rightContent}`}>
                <Link href={`/profile/${props.userId}`}>
                  <button className={styles.buttonSearch}>
                    <div>Lihat Profile</div>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
};

export default HouseCard;
