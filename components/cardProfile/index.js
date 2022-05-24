import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import styles from "../../styles/CardProfile.module.css";

const CardProfile = () => {
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
          <div className={styles.divLocation}>
            <div style={{ marginRight: "5px" }}>
              <Image
                className={styles}
                src="/mapIcon.svg"
                width={15}
                height={17}
              />
            </div>
            <div className={styles.address}>Jakarta</div>
          </div>
          <div className={styles.work}>Freelancer</div>
          <div className={styles.work}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            temporibus debitis cum.
          </div>
          <div className={styles.divButtton}>
            <button className={styles.buttonHire}>
              <div>Hire</div>
            </button>
          </div>
          <div className={styles.contentSkil}>
            <div className={styles.mainSkill}>Skill</div>
            <div className={styles.divSkill}>
              <div className={styles.skill}>php</div>
              <div className={styles.skill}>html</div>
              <div className={styles.skill}>css</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardProfile;
