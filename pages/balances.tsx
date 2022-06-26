import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Box, List } from '@mantine/core';
import { useAccount, useBalance, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useSplitContract } from '../contracts';
import { useEffect, useState } from 'react';
import { useMembers } from '../utils/useMembers';

const Balances: NextPage = () => {
  const { data: signer, isError: isError2, isLoading: isLoading2 } = useSigner();
  const { data: account, isError, isLoading } = useAccount();

  const contract = useSplitContract(signer);
  const { data: contractBalance } = useBalance({
    addressOrName: contract.address,
  })

  const members = useMembers(contract, signer);

  const [memberBalances, setMemberBalances] = useState<{ member: string, balance: ethers.BigNumber }[]>();
  useEffect(() => {
    if (!members) return;
    (async () => {
      const memberBalances = [];
      for (const member of members) {
        const balance = await contract.balances(member);
        memberBalances.push({
          member,
          balance,
        });
      }
      setMemberBalances(memberBalances);
    })();
  }, [members, contract]);

  if (isLoading) return <div>Loading account…</div>;
  if (isError) return <div>Error loading account</div>;

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <h1>Balances</h1>

      <h2>Contract balance: {contractBalance?.formatted}</h2>

      <List>
        {memberBalances ? memberBalances.map(member =>
          <List.Item key={member.member}>{member.member}: {ethers.utils.formatEther(member.balance)}</List.Item>
        ) : <>Loading members...</>}
      </List>

      <Link href="/">Back</Link>
    </Box >
  );
}

export default Balances;
