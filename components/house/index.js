import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import cookie from "js-cookie";

import styles from "../../styles/CardHouse.module.css";

const HouseCard = (props) => {
  const [data, setData] = useState(props);
  const isError = data.skills;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>

          {/* Start from this */}
          <div className={`col-10 ${styles.mainContent}`}>
            <div className={`row ${styles}`}>
              {/* left */}
              <div className={`col-2 ${styles.leftContent}`}>
                <Image
                  className={styles.image}
                  // src="/profile-default.png"
                  src={`http://localhost:3501/users/${props.photo}`}
                  width={105}
                  height={105}
                />
              </div>

              {/* Main */}
              <div className={`col-7 ${styles.centerContent}`}>
                <div>
                  <div className={styles.name}>{props.nama}</div>
                  <div className={styles.profession}>
                    {!data.jobDesk ? <div></div> : data.jobDesk}
                  </div>
                  <div className={styles.divLocation}>
                    <div style={{ marginRight: "5px" }}>
                      <Image
                        className={styles}
                        src="/mapIcon.svg"
                        width={20}
                        height={20}
                        // onError
                      />
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
              <div className={`col-3 ${styles.rightContent}`}>
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
