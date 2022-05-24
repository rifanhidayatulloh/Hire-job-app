import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
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

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
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
            <Image
              style={{ cursor: "pointer" }}
              src="/peworldIcon.png"
              width={100}
              height={35}
            />
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
                  <Image
                    className={styles.imageProfile}
                    src="/profile-default.png"
                    width={35}
                    height={35}
                  />
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
