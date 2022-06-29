import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import styles from '../../styles/Portofolio.module.css';

const Portofolio = props => {
  // console.log(props);

  // -----delete porto------
  const onDeletePorto = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the data ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I Sure!'
    }).then(async confirm => {
      if (confirm.isConfirmed) {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}portofolio/${id}`, {
            headers: {
              token: props.token
            }
          });
          window.location.reload();
        } catch (err) {
          sweetAlert(err.response.data.message, 'error');
        }
      }
    });
  };

  // -----delete porto------
  const onDeleteExp = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the data ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I Sure!'
    }).then(async confirm => {
      if (confirm.isConfirmed) {
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}experience/${id}`, {
            headers: {
              token: props.token
            }
          });
          window.location.reload();
        } catch (err) {
          sweetAlert(err.response.data.message, 'error');
        }
      }
    });
  };

  // ---- Tab ----
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <>
      <section className={`container-fluid `}>
        <div className={`row ${styles.mainContent}`}>
          <Nav tabs style={{ cursor: 'pointer' }}>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                <h5>Portofolio</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
                <h5>Pengalaman Kerja</h5>
              </NavLink>
            </NavItem>
          </Nav>

          {/* tab content */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1" style={{ height: '420px' }}>
              <Row>
                <Col sm="12">
                  <div
                    style={{
                      marginTop: '20px',
                      marginLeft: '10px',
                      display: 'flex'
                    }}
                  >
                    {!props.sendPorto ? (
                      <div></div>
                    ) : (
                      props.sendPorto.map((item, index) => (
                        <>
                          <div key={index} style={{ marginRight: '20px' }}>
                            <div className={styles.divImagePorto}>
                              {props.idParams == props.idUser ? (
                                <div onClick={e => onDeletePorto(e, item.id)} className={styles.divDeletePorto}>
                                  <Image className={styles.delete} src="/plus.svg" width={13} height={13} />
                                </div>
                              ) : (
                                <></>
                              )}
                              <Image
                                className={styles}
                                // src="/porto1.jpg"
                                src={`${item.photo}`}
                                width={220}
                                height={170}
                              />
                            </div>
                            <div style={{ textAlign: 'center' }}>{item.name_app}</div>
                          </div>
                        </>
                      ))
                    )}
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2" style={{ height: '420px' }}>
              <Row>
                <Col sm="12">
                  <div className={styles.mainExp}>
                    {!props.sendExp ? (
                      <div></div>
                    ) : (
                      props.sendExp.map((item, index) => (
                        <div className={`${styles.contentExp}`}>
                          <div style={{ marginRight: '20px' }}>
                            <Image className={styles} src="/company-default.png" width={80} height={100} />
                          </div>
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '85%'
                            }}
                          >
                            <div>
                              <h5>{item.positions}</h5>
                            </div>
                            <div>{item.company}</div>
                            <div style={{ marginBottom: '20px' }}>23 June 2022</div>
                            <div>{item.about_experience}</div>
                          </div>
                          {props.idParams == props.idUser ? (
                            <div className={styles.divdeleteExp}>
                              <button onClick={e => onDeleteExp(e, item.id)} className={styles.deleteExp}>
                                Delete
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </section>
    </>
  );
};

export default Portofolio;
