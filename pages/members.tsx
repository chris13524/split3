import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { TextInput, Box, Button, Text, Stack, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccount, useSigner } from 'wagmi';
import { useSplitContract } from '../utils/contracts';
import { useMembers } from '../utils/useMembers';

const AddTransaction: NextPage = () => {
  const { data: signer, isError: isError2, isLoading: isLoading2 } = useSigner();
  const { data: account, isError, isLoading } = useAccount();

  const contract = useSplitContract(signer);

  const form = useForm({
    initialValues: {
      address: "",
    },
  });

  const members = useMembers(contract, signer);

  if (isLoading) return <div>Loading account…</div>;
  if (isError) return <div>Error loading account</div>;

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Stack>
        <h1>Members</h1>

        <form onSubmit={form.onSubmit(values => {
          console.log("values.address: " + values.address);
          (async () => {
            await contract.addMember(values.address);
            alert("Member added");
          })();
        })}>
          <Stack>
            <TextInput
              label="Address"
              placeholder="0x000000"
              required
              {...form.getInputProps('address')}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>

        <h2>Existing members</h2>
        {members ? members.map(member =>
          <Paper key={member} shadow="xs" p="md">
            <Text lineClamp={4}>{member}</Text>
          </Paper>
        ) : <>Loading members...</>}

        <Link href="/"><a className={styles.link}>Back</a></Link>
      </Stack>
    </Box >
  );
}

export default AddTransaction;
