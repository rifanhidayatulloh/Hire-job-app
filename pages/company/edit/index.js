import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import swal from 'sweetalert2';
import jsCookie from 'js-cookie';

import styles from '../../../styles/EditComp.module.css';

export async function getServerSideProps(context) {
  const { token, idUser } = context.req.cookies;

  const apiUsersId = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}users/${idUser}`,
        headers: {
          token
        }
      });
      return {
        data: response.data,
        error: false
      };
    } catch (error) {
      return {
        data: [],
        error: true
      };
    }
  };
  return {
    props: {
      data: [],
      getUsers: await apiUsersId()
    }
  };
}

const EditComp = props => {
  const router = useRouter();
  const token = jsCookie.get('token');
  const [userData, setUserData] = useState(props.getUsers.data.data);

  const [getPhoto, setGetPhoto] = useState(`${process.env.NEXT_PUBLIC_API_URL}users/${userData.photo}`);

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [buttonVisibility, setButtonVisibility] = useState(false);

  const photoSubmit = e => {
    e.preventDefault();
    setLoading(false);
    if (loading == false) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', photo);
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}users/update/photo`, formData, {
          headers: {
            token: token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          swal
            .fire({
              title: 'Success!',
              text: 'Success Update photo',
              icon: 'success'
            })
            .then(() => {
              setButtonVisibility(!buttonVisibility);
              window.location.href = `/company/edit`;
            });
        })
        .catch(err => {
          swal
            .fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error'
            })
            .then(() => {
              setButtonVisibility(!buttonVisibility);
            });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const [form, setForm] = useState({
    company: userData.company,
    fieldCompany: userData.field_company,
    address: userData.address,
    about: userData.about,
    email: userData.email,
    instagram: userData.intagram,
    phone: userData.phone,
    linkedin: userData.linkedin
  });

  const onSubmit = e => {
    e.preventDefault();
    if (
      form.company === '' ||
      form.fieldCompany === '' ||
      form.address === '' ||
      form.about === '' ||
      form.email === '' ||
      form.instagram === '' ||
      form.phone === '' ||
      form.linkedin === ''
    ) {
      swal.fire({
        title: 'Error!',
        text: `Data Can't be empty`,
        icon: 'error'
      });
    } else {
      const body = {
        ...form
      };
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}users/update/company`, body, {
          headers: {
            token: token
          }
        })
        .then(res => {
          swal
            .fire({
              title: 'Success!',
              text: 'Success Update user',
              icon: 'success'
            })
            .then(() => {
              router.push(`/company/${userData.id}`);
            });
        })
        .catch(err => {
          swal
            .fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error'
            })
            .then(() => {});
        });
    }
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`container-fluid ${styles.section}`}>
        <div className={`row ${styles.mainContent}`}>
          <div className={styles.background}></div>
          <div className={`row ${styles.content}`}>
            <div className="col-md-1"></div>
            <div className={`col-md-3 col-12`}>
              {/* ---------------------------------Left--------------- */}
              <div className={`row ${styles.leftContent}`}>
                <div className={styles.divImage}>
                  <Image
                    className={styles.image}
                    // src="/profile-default.png"
                    src={getPhoto}
                    onError={() => setGetPhoto('/profile-default.png')}
                    width={105}
                    height={105}
                  />
                </div>
                <div className={styles.divEditImage}>
                  <form onSubmit={e => photoSubmit(e)}>
                    <input
                      type="file"
                      id="photo"
                      style={{ display: 'none' }}
                      onChange={e => {
                        setPhoto(e.target.files[0]);
                        setButtonVisibility(!buttonVisibility);
                      }}
                    />
                    <input type="submit" id="submit" style={{ display: 'none' }} />
                  </form>
                  {buttonVisibility ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById('submit').click();
                        }}
                        style={{
                          width: '135px',
                          height: '35px',
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #5e50a1',
                          color: '#5e50a1',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          fontSize: '15px',
                          marginBottom: '0px'
                        }}
                      >
                        {loading ? 'Loading..' : 'Upload'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => {
                          document.getElementById('photo').click();
                        }}
                      >
                        <div className={styles.imageEdit}>
                          <Image src="/edit.photo.profile.svg" width={19} height={19} />
                        </div>
                        <div className={styles.divTextEdit}>Edit</div>
                      </button>
                    </>
                  )}
                </div>
                <div className={styles.detailUser}>
                  <div className={styles.name}>{userData.company}</div>
                  <div className={styles.profession}>{userData.field_company}</div>
                  <div className={styles.divLocation}>
                    <div
                      style={{
                        marginRight: '5px',
                        position: 'relative',
                        display: 'flex'
                      }}
                    >
                      <Image className={styles} src="/mapIcon.svg" width={15} height={17} />
                    </div>
                    <div className={styles.address}>{userData.address}</div>
                  </div>
                  <div className={styles.divButtton}>
                    <button
                      onClick={() => {
                        document.getElementById('submitUser').click();
                      }}
                      type="button"
                      className={styles.buttonSave}
                    >
                      <div>Simpan</div>
                    </button>
                  </div>
                  <div className={styles.divButtton}>
                    <Link href={`/company/${userData.id}`}>
                      <button className={styles.buttonCancle}>
                        <div>Batal</div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-12 ">
              {/* ---------------------------Right------------- */}
              <div>
                {/* -----data diri---------- */}
                <form onSubmit={e => onSubmit(e)}>
                  <div className={`row ${styles.rightContent}`}>
                    <div className={styles.dataDiri}>
                      <h3>Data Diri</h3>
                    </div>
                    <div className={styles}>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="name"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Name Perusahaan
                          </label>
                        </div>
                        <input
                          value={form.company}
                          type="text"
                          name="name"
                          id="name"
                          placeholder=" Masukan nama perusahaan"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, company: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="fieldComp"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            bidang
                          </label>
                        </div>
                        <input
                          value={form.fieldCompany}
                          type="text"
                          name="fieldComp"
                          id="fieldComp"
                          placeholder=" Masukan bidang perusahaan"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, fieldCompany: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="address"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Kota
                          </label>
                        </div>
                        <input
                          value={form.address}
                          type="text"
                          name="address"
                          id="address"
                          placeholder=" Masukan kota"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, address: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="about"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Deskripsi Singkat
                          </label>
                        </div>
                        <textarea
                          value={form.about}
                          name="about"
                          id="about"
                          placeholder=" Tuliskan deskripsi singkat"
                          className={styles.textArea}
                          onChange={e => setForm({ ...form, about: e.target.value })}
                        ></textarea>
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="email"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Email
                          </label>
                        </div>
                        <input
                          value={form.email}
                          type="email"
                          name="email"
                          id="email"
                          placeholder=" Masukan email"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="instagram"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Instagram
                          </label>
                        </div>
                        <input
                          value={form.instagram}
                          type="text"
                          name="instagram"
                          id="instagram"
                          placeholder=" Masukan nama instagram"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, instagram: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="phone"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Nomor Telepon
                          </label>
                        </div>
                        <input
                          value={form.phone}
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder=" Masukan nomor telepon"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="linkedin"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Linkedin
                          </label>
                        </div>
                        <input
                          value={form.linkedin}
                          type="text"
                          name="linkedin"
                          id="linkedin"
                          placeholder=" Masukan nama linkedin"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, linkedin: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <button style={{ display: 'none' }} id="submitUser" type="submit"></button>
                </form>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    </>
  );
};

EditComp.layout = 'MainLayout';

export default EditComp;
