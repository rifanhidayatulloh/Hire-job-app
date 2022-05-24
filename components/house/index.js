import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import cookie from "js-cookie";

import styles from "../../styles/CardHouse.module.css";

const HouseCard = (props) => {
  const [loading, setLoading] = useState(true);
  const token = cookie.get("token");
  const config = {
    headers: { token },
  };
  const [data, setData] = useState([]);
  // console.log(data.data.map((e) => e.skills));
  useEffect(() => {
    axios
      .get(`http://localhost:4000/skill/${props.userId}`, config)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

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
                  src="/profile-default.png"
                  // src={`http://localhost:4000/public/users/${props.photo}`}
                  width={105}
                  height={105}
                />
              </div>

              {/* Main */}
              <div className={`col-7 ${styles.centerContent}`}>
                <div>
                  <div className={styles.name}>{props.nama}</div>
                  <div className={styles.profession}>Web developer</div>
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
                    <div className={styles.address}>Jakarta</div>
                  </div>
                  {/* <div className={styles.divSkill}>
                    <div className={styles.skill}>php </div>
                    <div className={styles.skill}>html </div>
                    <div className={styles.skill}>css</div>
                  </div> */}

                  {loading ? (
                    <div className={styles.divSkill}>
                      <div>Loading....</div>
                    </div>
                  ) : (
                    <div>
                      {data.data.map((e, i) => {
                        <div key={i} className={styles.divSkill}>
                          <div className={styles.skill}>{e.skills}</div>
                        </div>;
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* End */}
              <div className={`col-3 ${styles.rightContent}`}>
                <button className={styles.buttonSearch}>
                  <Link href={`/profile/${props.userId}`}>
                    <div>Lihat Profile</div>
                  </Link>
                </button>
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
