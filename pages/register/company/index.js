import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";

import styles from "../../../styles/RegisterComp.module.css";

export async function getServerSideProps(context) {
  const loginAPI = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/users`,
      });
      return {
        data: response.data,
        error: false,
      };
    } catch (error) {
      return {
        data: [],
        error: true,
      };
    }
  };
  return {
    props: {
      data: [],
      api1: await loginAPI(),
    },
  };
}

const RegisterComp = (props) => {
  const router = useRouter();
  const [data, setData] = useState(props);
  return (
    <>
      <Head>
        <title>Register Hire Job</title>
      </Head>

      <section className={`container`}>
        <div className={`row ${styles.main}`}>
          <div className={`col-5 ${styles.leftContent}`}>
            <div className={styles.divIcon}>
              <Image
                className={styles.icon}
                src="/putihPeworld.png"
                width={100}
                height={35}
              />
            </div>
            <div className={styles.divText}>
              <h1 className={styles.text}>
                Temukan developer berbakat & terbaik di berbagai bidang keahlian
              </h1>
            </div>
          </div>
          <div className={`col-7 `}>
            <h1>Register company</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterComp;
