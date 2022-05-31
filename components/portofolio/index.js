import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import styles from "../../styles/Portofolio.module.css";

const Portofolio = (props) => {
  // console.log(props);

  // ---- Tab ----
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <>
      <section className={`container-fluid `}>
        <div className={`row ${styles.mainContent}`}>
          <Nav tabs style={{ cursor: "pointer" }}>
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "active" : ""}
                onClick={() => {
                  toggle("1");
                }}
              >
                <h5>Portofolio</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => {
                  toggle("2");
                }}
              >
                <h5>Pengalaman Kerja</h5>
              </NavLink>
            </NavItem>
          </Nav>

          {/* tab content */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1" style={{ height: "420px" }}>
              <Row>
                <Col sm="12">
                  <div
                    style={{
                      marginTop: "20px",
                      marginLeft: "10px",
                      display: "flex",
                    }}
                  >
                    {!props.sendPorto ? (
                      <div></div>
                    ) : (
                      props.sendPorto.map((item, index) => (
                        <>
                          <div key={index} style={{ marginRight: "20px" }}>
                            <Image
                              className={styles}
                              // src="/porto1.jpg"
                              src={`http://localhost:3501/portofolio/${item.photo}`}
                              width={220}
                              height={170}
                            />
                            <div style={{ textAlign: "center" }}>
                              {item.name_app}
                            </div>
                          </div>
                        </>
                      ))
                    )}
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2" style={{ height: "420px" }}>
              <Row>
                <Col sm="12">
                  <div
                    style={{
                      marginTop: "20px",
                      marginLeft: "10px",
                      marginBottom: "30px",
                      display: "flex",
                    }}
                  >
                    {!props.sendExp ? (
                      <div></div>
                    ) : (
                      props.sendExp.map((item, index) => (
                        <>
                          <div style={{ marginRight: "20px" }}>
                            <Image
                              className={styles}
                              src="/company-default.png"
                              width={80}
                              height={100}
                            />
                          </div>
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "85%",
                            }}
                          >
                            <div>
                              <h5>{item.positions}</h5>
                            </div>
                            <div>{item.company}</div>
                            <div style={{ marginBottom: "20px" }}>
                              July 2019 - January 2020 6 month
                            </div>
                            <div>{item.about_experience}</div>
                          </div>
                        </>
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
