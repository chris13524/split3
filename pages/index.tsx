import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Split3</title>
        <meta name="description" content="Spli3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectButton />
    </>
  );
}

export default Home;
