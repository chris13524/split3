import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const AddTransaction: NextPage = () => {
  return (
    <>
      <h1>Add Transaction</h1>
      <Link href="..">Back</Link>
    </>
  );
}

export default AddTransaction;
