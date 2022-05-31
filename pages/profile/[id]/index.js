import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";

import styles from "../../../styles/Profile.module.css";
import CardProfile from "../../../components/cardProfile/index";
import Portofolio from "../../../components/portofolio/index";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { token, idUser } = context.req.cookies;
  let getLevel;
  if (token) {
    const { level } = jwtDecode(token);
    getLevel = level;
  }

  const apiUsersId = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3501/users/${id}`,
        headers: {
          token,
        },
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
  const apiPorto = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3501/portofolio/detail/${id}`,
        headers: {
          token,
        },
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
  const apiExperience = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3501/experience/${id}`,
        headers: {
          token,
        },
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
      getUsers: await apiUsersId(),
      getPorto: await apiPorto(),
      getExperience: await apiExperience(),
      idUser,
      getLevel,
    },
  };
}

const Profile = (props) => {
  const [data, setData] = useState(props.getUsers.data.data);
  const [porto, setPorto] = useState(props.getPorto.data.data);
  const [experience, setExperience] = useState(props.getExperience.data.data);
  // console.log(experience);

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`container-fluid ${styles.section}`}>
        <div className={`row ${styles.mainContent}`}>
          <div className={styles.background}></div>
          <div className={`row ${styles.content}`}>
            <div className="col-1"></div>
            <div className={`col-3`}>
              <CardProfile
                name={data.fullname}
                id={data.id}
                jobDesk={data.job_desk}
                workplace={data.workplace}
                photo={data.photo}
                skills={data.skills}
                about={data.about}
                level={props.getLevel}
                idUser={props.idUser}
              />
            </div>
            <div className="col-7 ">
              <Portofolio sendPorto={porto} sendExp={experience} />
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

Profile.layout = "MainLayout";

export default Profile;
