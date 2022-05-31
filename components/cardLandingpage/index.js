import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import styles from "../../styles/CardLanding.module.css";

const CardLanding = () => {
  return (
    <>
      <section className={`container-fluid `}>
        <div className={`row ${styles.mainContent}`}>
          <div className={styles.divImage}>
            <Image
              className={styles.image}
              src="/profile-default.png"
              width={105}
              height={105}
            />
          </div>
          <div className={styles.name}>Louis</div>
          <div className={styles.profession}>Web developer</div>
          <div className={styles.work}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            temporibus debitis cum.
          </div>
        </div>
      </section>
    </>
  );
};

export default CardLanding;
