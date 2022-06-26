import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Box, Stack, Text, Paper } from '@mantine/core';
import { useAccount, useBalance, useSigner, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { useSplitContract } from '../utils/contracts';
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
      <Stack>
        <h1>Balances</h1>

        <h2>Contract balance: {contractBalance?.formatted} ETH</h2>
        {/* <h2>Current ETH price: {chainlinkData.}</h2> */}
        {memberBalances ? memberBalances.map(member =>
          <Paper key={member.member} shadow="xs" p="md">
            <Text lineClamp={4}>
              {member.member}: {ethers.utils.formatEther(member.balance)} ETH
            </Text>
          </Paper>
        ) : <>Loading members...</>}

        <Link href="/"><a className={styles.link}>Back</a></Link>
      </Stack>
    </Box >
  );
}

export default Balances;
