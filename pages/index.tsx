import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Split/3</title>
        <meta name="description" content="Spli3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConnectButton />

      <div className={styles.links}>
        <h1>Split/3</h1>
        <Link href="/balances">Balances</Link>
        <Link href="/add-transaction">Add transaction</Link>
        <Link href="/settle-up">Settle up</Link>
        <Link href="/deposit">Deposit</Link>
        <Link href="/withdraw">Withdraw</Link>
      </div>
    </>
  );
}

export default Home;
