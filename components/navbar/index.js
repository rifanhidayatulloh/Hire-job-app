import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";

import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const id = jsCookie.get("idUser");
  const token = jsCookie.get("token");

  const [backgroundColor, setBackgroundColor] = useState("");
  const [shadow, setShadow] = useState("");

  // ------bg-------
  const changeBackground = () => {
    if (window.scrollY > 0) {
      setBackgroundColor("light");
      setShadow("shadow mb-5 bg-body rounded");
    } else {
      setBackgroundColor("");
      setShadow("");
    }
  };

  // const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);

    axios
      .get(`http://localhost:3501/users/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <nav
        className={`container-fluid fixed-top ${shadow}`}
        backgroundcolor={backgroundColor}
      >
        <div className={`row ${styles.navContent}`}>
          {/* Nav left */}
          <div className={`col-6 ${styles.leftContent}`}>
            <Link href="/">
              <div>
                <Image
                  style={{ cursor: "pointer" }}
                  src="/peworldIcon.png"
                  width={100}
                  height={35}
                />
              </div>
            </Link>
          </div>
          {/* Nav Right */}
          <div className={`col-6`}>
            <div className={`${styles.rightContent}`}>
              <ul className={`row ${styles.ul}`}>
                <li
                  style={{ position: "relative", top: "15px" }}
                  className={`col-4`}
                >
                  <Image
                    style={{ cursor: "pointer" }}
                    src="/lonceng.svg"
                    width={35}
                    height={25}
                  />
                </li>
                <li
                  style={{ position: "relative", top: "15px" }}
                  className={`col-4`}
                >
                  <Image
                    style={{ cursor: "pointer" }}
                    src="/message.svg"
                    width={35}
                    height={25}
                  />
                </li>
                <li
                  style={{ position: "relative", top: "10px" }}
                  className={`col-4`}
                >
                  <Link href={`/profile/${id}`}>
                    <div>
                      <Image
                        className={styles.imageProfile}
                        // src="/profile-default.png"
                        src={`http://localhost:3501/users/${users.photo}`}
                        width={35}
                        height={35}
                      />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
