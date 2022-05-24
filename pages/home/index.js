import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import styles from "../../styles/House.module.css";
import styless from "../../styles/CardHouse.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Card from "../../components/house/index";

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const apiUsers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/users`,
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
      getUsers: await apiUsers(),
    },
  };
}

const Home = (props) => {
  const [data, setData] = useState(props.getUsers.data);
  // console.log(props.getUsers.data.data);
  return (
    <>
      <Navbar />

      <section className={`container-fluid ${styles.section}`}>
        <div className={`col ${styles.mainContent}`}>
          <div className={`row ${styles.titleContent}`}>
            <div className="col-1"></div>
            <div className="col-10">
              <h3>Top Jobs</h3>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row" style={{ margin: "35px 0px" }}>
            <div className="col-1"></div>
            <div className={`col-10`}>
              <div className={`bg-white ${styles.divSearch}`}>
                <input
                  placeholder="  Search for any skill"
                  className={styles.search}
                  type="text"
                />
                <div className={styles.iconSearch}>
                  <Image src="/iconSearch.svg" width={50} height={30} />
                </div>
                <div className={styles.divLine}></div>
                <div className={styles.divSort}>
                  <select name="" id="" className={styles.sort}>
                    <option value="null" disabled="disabled" selected>
                      Sort
                    </option>
                    <option value="name">Nama</option>
                    <option value="skill">Skill</option>
                  </select>
                </div>
                <button className={styles.buttonSearch}>
                  <div>Search</div>
                </button>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              {/* ------------------------------Card------------------------------------------------- */}
              {props.getUsers == "" ? (
                <div>Loading</div>
              ) : (
                <div>
                  {data.data.map((e, i) => (
                    <div key={i}>
                      <Card userId={e.id} photo={e.photo} nama={e.fullname} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
