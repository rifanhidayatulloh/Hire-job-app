import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import Select from "react-select";
import swal from "sweetalert2";
import jsCookie from "js-cookie";

import styles from "../../../styles/Message.module.css";

// export async function getServerSideProps(context) {
//   const { token, idUser } = context.req.cookies;

//   const apiUsersId = async () => {
//     try {
//       const response = await axios({
//         method: "get",
//         url: `${process.env.NEXT_PUBLIC_API_URL}users/${idUser}`,
//         headers: {
//           token,
//         },
//       });
//       return {
//         data: response.data,
//         error: false,
//       };
//     } catch (error) {
//       return {
//         data: [],
//         error: true,
//       };
//     }
//   };
//   return {
//     props: {
//       data: [],
//       getUsers: await apiUsersId(),
//     },
//   };
// }

const Message = (props) => {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`container-fluid ${styles.section}`}>
        <div className={`row ${styles.mainContent}`}>
          <div className={`row ${styles.content}`}>
            <div className="col-1"></div>
            <div className={`col-3 ${styles.leftContent}`}>
              {/* ---------------------------------Left--------------- */}
              <div className={styles.chatTitle}>
                <h4>Chat</h4>
              </div>
              <div></div>
            </div>
            <div className="col-7 ">
              {/* ---------------------------Right------------- */}
              <div>
                <div>
                  <h4>Person</h4>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

Message.layout = "MainLayout";

export default Message;
