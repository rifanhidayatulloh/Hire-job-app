import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import swal from "sweetalert2";

import styles from "../../../styles/RegisterWork.module.css";

const onRegister = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const RegisterWork = (props) => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    newPassword: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      form.email === "" ||
      form.name === "" ||
      form.password === "" ||
      form.phone === "" ||
      form.newPassword === ""
    ) {
      swal.fire({
        title: "Error!",
        text: "All field must be filled!",
        icon: "error",
      });
    } else if (form.password !== form.newPassword) {
      swal.fire({
        title: "Error!",
        text: "Oopss... check your password",
        icon: "error",
      });
    } else {
      onRegister(form)
        .then((res) => {
          swal
            .fire({
              title: "Success!",
              text: "Registrasi Success, Please check your email for confirm",
              icon: "success",
            })
            .then(() => {
              router.push("/login");
            });
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: "error",
            title: "Ooops... Register Failed",
            text: "Register Failed",
          });
        });
    }
  };

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
                <div style={{ marginBottom: "10px" }}>
                  <label
                    htmlFor="name"
                    style={{
                      marginBottom: "7px",
                      color: "rgba(158, 160, 165, 1)",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder=" Masukan nama panjang"
                    className={styles.inputEmail}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
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
                    placeholder=" Masukan email"
                    className={styles.inputEmail}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label
                    htmlFor="phone"
                    style={{
                      marginBottom: "7px",
                      color: "rgba(158, 160, 165, 1)",
                    }}
                  >
                    No Handphone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder=" Masukan no handphone"
                    className={styles.inputEmail}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
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
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="confirm"
                    style={{
                      marginBottom: "7px",
                      color: "rgba(158, 160, 165, 1)",
                    }}
                  >
                    Konfirmasi kata Sandi
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder=" Masukan konfirmasi kata sandi"
                    className={styles.inputEmail}
                    onChange={(e) =>
                      setForm({ ...form, newPassword: e.target.value })
                    }
                  />
                </div>
                <div
                  className={styles.divButton}
                  style={{ marginBottom: "10px" }}
                >
                  {/* <Link href="/login"> */}
                  <button className={styles.button}>Masuk</button>
                  {/* </Link> */}
                </div>
              </form>

              <div className={styles.divRegister}>
                <div style={{ marginRight: "auto" }}>
                  <p style={{ color: "rgba(31, 42, 54, 1)" }}>
                    Anda sudah punya akun?{" "}
                    <Link href="/login">
                      <span
                        style={{
                          color: "rgba(251, 176, 23, 1)",
                          cursor: "pointer",
                        }}
                      >
                        Masuk disini
                      </span>
                    </Link>
                  </p>
                </div>
                <div>
                  <p style={{ color: "rgba(31, 42, 54, 1)" }}>
                    Daftar sebagai company?{" "}
                    <Link href="/register/company">
                      <span
                        style={{
                          color: "rgba(251, 176, 23, 1)",
                          cursor: "pointer",
                        }}
                      >
                        Klick disini
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterWork;
