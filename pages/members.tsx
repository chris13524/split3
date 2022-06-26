import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { TextInput, Box, Button, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAccount, useSigner } from 'wagmi';
import { useSplitContract } from '../contracts';
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
      <h1>Members</h1>

      <form onSubmit={form.onSubmit(values => {
        console.log("values.address: " + values.address);
        (async () => {
          await contract.addMember(values.address);
          alert("Member added");
        })();
      })}>
        <TextInput
          label="Address"
          placeholder="0x000000"
          required
          {...form.getInputProps('address')}
        />
        <Button type="submit">Submit</Button>
      </form>

      <List>
        {members ? members.map(member =>
          <List.Item>{ member }</List.Item>
        ) : <>Loading members...</>}
      </List>

      <Link href="/">Back</Link>
    </Box >
  );
}

export default AddTransaction;
