import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Box, NumberInput, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useSplitContract } from '../utils/contracts';
import { useMembers } from '../utils/useMembers';

const Deposit: NextPage = () => {
  const { data: signer, isError: isError2, isLoading: isLoading2 } = useSigner();
  const { data: account, isError, isLoading } = useAccount();

  const contract = useSplitContract(signer);

  const members = useMembers(contract, signer);

  const form = useForm({
    initialValues: {
      amount: "",
    },
  });

  if (isLoading) return <div>Loading account…</div>;
  if (isError) return <div>Error loading account</div>;

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Stack>
        <h1>Deposit</h1>

        <form onSubmit={form.onSubmit(values => {
          console.log("values.amount:", values.amount);
          (async () => {
            await contract.deposit({ value: ethers.utils.parseEther(values.amount.toString()) });
            alert("Deposit accepted");
          })();
        })}>
          <Stack>
            <NumberInput
              label="Amount"
              placeholder="0.01"
              precision={8}
              required
              {...form.getInputProps('amount')}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>

        <Link href="/"><a className={styles.link}>Back</a></Link>
      </Stack>
    </Box >
  );
}

export default Deposit;
