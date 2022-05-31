import React from "react";

const Message = () => {
  return (
    <>
      <Head>
        <title>Message</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`container-fluid`}>
        <div className={`row`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  );
};

Message.layout = "MainLayout";

export default Message;
