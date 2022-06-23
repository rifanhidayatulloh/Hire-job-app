import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import swal from "sweetalert2";

import styles from "../../styles/Login.module.css";

const onLogin = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, data)
      .then((res) => {
        document.cookie = `token=${res.data.token}; path=/`;
        document.cookie = `idUser=${res.data.data}; path=/`;
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      swal.fire({
        title: "Error!",
        text: "All field must be filled!",
        icon: "error",
      });
    } else {
      onLogin(form)
        .then((res) => {
          swal
            .fire({
              title: "Success!",
              text: "Login Success",
              icon: "success",
            })
            .then(() => {
              router.push("/");
            });
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "Ooops... Login Failed",
            text: "Check your email and password",
          });
        });
    }
  };
  return (
    <>
      <Head>
        <title>Login Hire Job</title>
      </Head>

      <section className={`container`}>
        <div className={`row ${styles.main}`}>
          {/* Left content */}
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

          {/* Right Content */}
          <div className={`col-7 ${styles.rightContent}`}>
            <div className={`${styles.rightMain}`}>
              <h3>Halo, Pewpeople</h3>
              <div className={styles.divParagraph}>
                <p style={{ width: "100%", color: "rgba(70, 80, 92, 1)" }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maiores ea cupiditate rerum veniam.
                </p>
              </div>
              <form onSubmit={(e) => onSubmit(e)}>
                <div style={{ marginBottom: "30px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      marginBottom: "7px",
                      color: "rgba(158, 160, 165, 1)",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder=" Masukan alamat email"
                    className={styles.inputEmail}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <label
                    htmlFor="password"
                    style={{
                      marginBottom: "7px",
                      color: "rgba(158, 160, 165, 1)",
                    }}
                  >
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder=" Masukan kata sandi"
                    className={styles.inputEmail}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
                <div
                  className={styles.divForgot}
                  style={{ marginBottom: "30px" }}
                >
                  <p
                    style={{ color: "rgba(31, 42, 54, 1)", cursor: "pointer" }}
                  >
                    Lupa kata sandi?
                  </p>
                </div>
                <div
                  className={styles.divButton}
                  style={{ marginBottom: "30px" }}
                >
                  {/* <Link href="/home"> */}
                  <button className={styles.button}>Masuk</button>
                  {/* </Link> */}
                </div>
              </form>

              <div className={styles.divRegister}>
                <p style={{ color: "rgba(31, 42, 54, 1)" }}>
                  Anda belum punya akun?{" "}
                  <Link href="/register/worker">
                    <span
                      style={{
                        color: "rgba(251, 176, 23, 1)",
                        cursor: "pointer",
                      }}
                    >
                      Daftar disini
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
