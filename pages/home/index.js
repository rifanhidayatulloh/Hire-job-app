import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import jwtDecode from "jwt-decode";

import styles from "../../styles/House.module.css";
import styless from "../../styles/CardHouse.module.css";
import Card from "../../components/house/index";

export async function getServerSideProps(context) {
  const { search, sort, limit, page } = context.query;
  const getSearch = !search ? "" : search;
  const getSort = !sort ? "fullname" : sort;
  const { token } = context.req.cookies;
  const apiUsers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3501/users?limit=&page=&search=${getSearch}&sortField=${getSort}&sortType=`,
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
      getSearch,
    },
  };
}

const Home = (props) => {
  const router = useRouter();
  const [data, setData] = useState(props.getUsers.data);
  const [form, setForm] = useState("");
  const [forms, setForms] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // router.push(`/home?search=${form}&sort=${forms}`); //window.location
    window.location.href = `/home?search=${form}&sort=${forms}`;
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              <form onSubmit={(e) => onSubmit(e)}>
                <div className={`bg-white ${styles.divSearch}`}>
                  <input
                    value={form}
                    onChange={(e) => setForm(e.target.value)}
                    placeholder="  Search for any skill"
                    className={styles.search}
                    type="text"
                    id="search"
                  />
                  <div className={styles.iconSearch}>
                    <Image src="/iconSearch.svg" width={50} height={30} />
                  </div>
                  <div className={styles.divLine}></div>
                  <div className={styles.divSort}>
                    <select
                      onChange={(e) => setForms(e.target.value)}
                      name=""
                      id=""
                      className={styles.sort}
                    >
                      <option value="null" disabled="disabled" selected>
                        Sort
                      </option>
                      <option value="fullname">Nama</option>
                      <option value="workplace">Lokasi</option>
                      <option value="job_desk">Job</option>
                    </select>
                  </div>
                  <button type="submit" className={styles.buttonSearch}>
                    <div>Search</div>
                  </button>
                </div>
              </form>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              {/* ------------------------------Card------------------------------------------------- */}
              {!data.data ? (
                <>
                  <div className={styles.divError}>
                    <div className={styles.error}>
                      <h1>Data not found</h1>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  {data.data.map((e, i) => (
                    <div key={i}>
                      <Card
                        userId={e.id}
                        photo={e.photo}
                        nama={e.fullname}
                        skills={e.skills}
                        workplace={e.workplace}
                        jobDesk={e.job_desk}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* {props.getUsers == "" ? (
                <div>Loading</div>
              ) : (
                <div>
                  {data.data.map((e, i) => (
                    <div key={i}>
                      <Card
                        userId={e.id}
                        photo={e.photo}
                        nama={e.fullname}
                        skills={e.skills}
                        workplace={e.workplace}
                      />
                    </div>
                  ))}
                </div>
              )} */}
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

Home.layout = "MainLayout";

export default Home;
