import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import styles from "../../styles/Profile.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import CardProfile from "../../components/cardProfile";
import Portofolio from "../../components/portofolio";

const Profile = () => {
  return (
    <>
      <Navbar />

      <section className={`container-fluid ${styles.section}`}>
        <div className={`row ${styles.mainContent}`}>
          <div className={styles.background}></div>
          <div className={`row ${styles.content}`}>
            <div className="col-1"></div>
            <div className={`col-3`}>
              <CardProfile />
            </div>
            <div className="col-7 ">
              <Portofolio />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
