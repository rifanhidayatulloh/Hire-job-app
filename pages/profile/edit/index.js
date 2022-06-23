import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import swal from 'sweetalert2';
import jsCookie from 'js-cookie';

import styles from '../../../styles/EditProfile.module.css';

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

const Profile = props => {
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
              window.location.href = `/profile/edit`;
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
    name: userData.fullname,
    jobDesk: userData.job_desk,
    address: userData.address,
    workplace: userData.workplace,
    aboutUser: userData.about
  });
  const [skills, setSkills] = useState(userData.skills);

  const onSubmit = e => {
    e.preventDefault();
    if (
      form.name === '' ||
      form.jobDesk === '' ||
      form.address === '' ||
      form.workplace === '' ||
      form.aboutUser === '' ||
      skills === ''
    ) {
      swal.fire({
        title: 'Error!',
        text: `Data Can't be empty`,
        icon: 'error'
      });
    } else {
      const body = {
        skills: `{${skills}}`,
        ...form
      };
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}users/update/worker`, body, {
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
              router.push(`/profile/${userData.id}`);
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

  // ----------------------portofolio insert-------------------
  const [formPorto, setFormPorto] = useState({
    nameApp: '',
    linkRepo: '',
    typeApp: 1,
    photo: ''
  });
  const onPortofolio = e => {
    e.preventDefault();
    if (formPorto.nameApp === '' || formPorto.linkRepo === '' || formPorto.photo === '') {
      swal.fire({
        title: 'Error!',
        text: `Data Can't be empty`,
        icon: 'error'
      });
    } else {
      const body = {
        ...formPorto
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}portofolio`, body, {
          headers: {
            token: token
          }
        })
        .then(res => {
          swal
            .fire({
              title: 'Success!',
              text: 'Success Insert Portofolio',
              icon: 'success'
            })
            .then(() => {
              router.push(`/profile/${userData.id}`);
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

  // ----------------------Exp insert-------------------
  const [formExp, setFormExp] = useState({
    company: '',
    year: '',
    aboutExperience: '',
    position: ''
  });
  const onExperience = e => {
    e.preventDefault();
    if (formExp.company === '' || formExp.year === '' || formExp.aboutExperience === '' || formExp.position === '') {
      swal.fire({
        title: 'Error!',
        text: `Data Can't be empty`,
        icon: 'error'
      });
    } else {
      const body = {
        ...formExp
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}experience`, body, {
          headers: {
            token: token
          }
        })
        .then(res => {
          swal
            .fire({
              title: 'Success!',
              text: 'Success Insert Pengalaman Kerja',
              icon: 'success'
            })
            .then(() => {
              router.push(`/profile/${userData.id}`);
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
            <div className="col-1"></div>
            <div className={`col-3`}>
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
                  <div className={styles.name}>{userData.fullname}</div>
                  <div className={styles.profession}>{userData.job_desk}</div>
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
                    <div className={styles.address}>{userData.workplace}</div>
                  </div>
                  <div className={styles.work}>Freelancer</div>
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
                    <Link href={`/profile/${userData.id}`}>
                      <button className={styles.buttonCancle}>
                        <div>Batal</div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7 ">
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
                            Name Lengkap
                          </label>
                        </div>
                        <input
                          value={form.name}
                          type="text"
                          name="name"
                          id="name"
                          placeholder=" Masukan nama lengkap"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="job"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Job Desk
                          </label>
                        </div>
                        <input
                          value={form.jobDesk}
                          type="text"
                          name="job"
                          id="job"
                          placeholder=" Masukan job desk"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, jobDesk: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="domisili"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Domisili
                          </label>
                        </div>
                        <input
                          value={form.address}
                          type="text"
                          name="domisili"
                          id="domisili"
                          placeholder=" Masukan domisili"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, address: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="workplace"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Tempat Kerja
                          </label>
                        </div>
                        <input
                          value={form.workplace}
                          type="text"
                          name="workplace"
                          id="workplace"
                          placeholder=" Masukan tempat kerja"
                          className={styles.inputEmail}
                          onChange={e => setForm({ ...form, workplace: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="deskripsi"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Deskripsi Singkat
                          </label>
                        </div>
                        <textarea
                          value={form.aboutUser}
                          name="deskripsi"
                          id="deskripsi"
                          placeholder=" Masukan deskripsi singkat"
                          className={styles.textArea}
                          onChange={e => setForm({ ...form, aboutUser: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* ------skill--------- */}
                  <div className={`row ${styles.rightContent}`}>
                    <div className={styles.dataDiri}>
                      <h3>Skill</h3>
                    </div>
                    <div className={`row ${styles.formSkills}`}>
                      <div className={`col-12 ${styles.divSelect}`}>
                        <input
                          defaultValue={skills}
                          type="text"
                          name="skill"
                          id="skill"
                          placeholder=" Masukan skill"
                          className={styles.inputSkill}
                          onChange={e => setSkills(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button style={{ display: 'none' }} id="submitUser" type="submit"></button>
                </form>

                {/* -------Pengalaman kerja---------- */}
                <div className={`row ${styles.rightContent}`}>
                  <div className={styles.dataDiri}>
                    <h3>Pengalaman Kerja</h3>
                  </div>
                  <div>
                    <form onSubmit={e => onExperience(e)}>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="posisi"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Posisi
                          </label>
                        </div>
                        <input
                          type="text"
                          name="posisi"
                          id="posisi"
                          placeholder=" Masukan posisi"
                          className={styles.inputEmail}
                          onChange={e => setFormExp({ ...formExp, position: e.target.value })}
                        />
                      </div>
                      <div className="row" style={{ padding: '0px 11px' }}>
                        <div className={`col-6 ${styles.divName}`}>
                          <div>
                            <label
                              htmlFor="company"
                              style={{
                                marginBottom: '7px',
                                color: 'rgba(158, 160, 165, 1)'
                              }}
                            >
                              Name Perusahaan
                            </label>
                          </div>
                          <input
                            type="text"
                            name="company"
                            id="company"
                            placeholder=" Masukan nama perusahaan"
                            className={styles.inputEmail}
                            onChange={e => setFormExp({ ...formExp, company: e.target.value })}
                          />
                        </div>
                        <div className={`col-6 ${styles.divName}`}>
                          <div>
                            <label
                              htmlFor="year"
                              style={{
                                marginBottom: '7px',
                                color: 'rgba(158, 160, 165, 1)'
                              }}
                            >
                              Bulan / tahun
                            </label>
                          </div>
                          <input
                            type="date"
                            name="year"
                            id="year"
                            className={styles.inputEmail}
                            onChange={e => setFormExp({ ...formExp, year: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="deskrip-company"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Deskripsi Singkat
                          </label>
                        </div>
                        <textarea
                          name="deskrip-company"
                          id="deskrip-company"
                          placeholder=" Masukan deskripsi singkat"
                          className={styles.textArea}
                          onChange={e => setFormExp({ ...formExp, aboutExperience: e.target.value })}
                        ></textarea>
                      </div>
                      <div className={styles.dataDiri} style={{ marginBottom: '35px' }}></div>
                      <div className={styles.divADD}>
                        <button type="submit" className={styles.buttonADD}>
                          <h6>Tambah Pengalaman Kerja</h6>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* --------Portofolio---------- */}
                <div className={`row ${styles.rightContent}`}>
                  {/* <form></form> */}
                  <div className={styles.dataDiri}>
                    <h3>Portofolio</h3>
                  </div>
                  <div>
                    <form onSubmit={e => onPortofolio(e)}>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="app"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Nama Aplikasi
                          </label>
                        </div>
                        <input
                          type="text"
                          name="app"
                          id="app"
                          placeholder=" Masukan nama aplikasi"
                          className={styles.inputEmail}
                          onChange={e => setFormPorto({ ...formPorto, nameApp: e.target.value })}
                        />
                      </div>
                      <div className={styles.divName}>
                        <div>
                          <label
                            htmlFor="repository"
                            style={{
                              marginBottom: '7px',
                              color: 'rgba(158, 160, 165, 1)'
                            }}
                          >
                            Link Repository
                          </label>
                        </div>
                        <input
                          type="url"
                          name="repository"
                          id="repository"
                          placeholder=" Masukan link repository"
                          className={styles.inputEmail}
                          onChange={e => setFormPorto({ ...formPorto, linkRepo: e.target.value })}
                        />
                      </div>
                      <div className={styles.divPorto}>
                        <div className={styles.porto}>Type Portofolio</div>
                        <div className={`d-flex ${styles.divRadio}`}>
                          <div className={styles.borderRadio}>
                            <input type="radio" name="radio" id="radio1" className={styles.inputRadio} />
                            <label htmlFor="radio1" className={styles}>
                              Aplikasi Mobile
                            </label>
                          </div>
                          <div className={styles.borderRadio}>
                            <input type="radio" name="radio" id="radio2" className={styles.inputRadio} />
                            <label htmlFor="radio2" className={styles}>
                              Aplikasi Web
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className={styles.divPorto}>
                        <div className={styles.porto}>Upload Gambar</div>
                        <div className={`${styles.inputPorto}`}>
                          <div className={styles.buttonPorto}>
                            <label style={{ cursor: 'pointer' }} htmlFor="linkporto">
                              <Image className={styles} src="/portooo.png" width={200} height={105} />
                            </label>
                          </div>
                          <div>
                            <input
                              id="linkporto"
                              placeholder=" Masukan link photo"
                              className={styles.inputImagePorto}
                              type="text"
                              onChange={e => setFormPorto({ ...formPorto, photo: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.dataDiri} style={{ marginBottom: '35px' }}></div>
                      <div className={styles.divADD}>
                        <button type="submit" className={styles.buttonADD}>
                          <h6>Tambah Portofolio</h6>
                        </button>
                      </div>
                    </form>
                  </div>
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

Profile.layout = 'MainLayout';

export default Profile;
