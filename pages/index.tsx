import { Box, Stack } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Split/3</title>
        <meta name="description" content="Spli3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Stack>
          <h1>Split/3</h1>
          <Link href="/members"><a className={styles.link}>Members</a></Link>
          <Link href="/balances"><a className={styles.link}>Balances</a></Link>
          <Link href="/add-transaction"><a className={styles.link}>Add transaction</a></Link>
          <Link href="/settle-up"><a className={styles.link}>Settle up</a></Link>
          <Link href="/deposit"><a className={styles.link}>Deposit</a></Link>
          <Link href="/withdraw"><a className={styles.link}>Withdraw</a></Link>
        </Stack>
      </Box>
    </>
  );
}

export default Home;
