import Head from "next/head";
import React from "react";

import styles from "../../styles/home.module.scss";

const Header: React.FC = () => (
  <div>
    <Head>
      <title>Droppe Xmas 🎄</title>
    </Head>
    <main className={styles.main}>
      <h1 className={styles.title}>Droppe Xmas 🎄</h1>
    </main>
  </div>
);

export default Header;
