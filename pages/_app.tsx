import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public';
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';
import React from 'react';

// if (window) {
//   chain.localhost.rpcUrls = { default: `https://${window.location.hostname.replace("3000", "8545")}` };
// }

const { chains, provider } = configureChains(
  [/*chain.localhost, chain.mainnet, chain.polygon,*/ chain.polygonMumbai, /*chain.optimism, chain.arbitrum*/],
  [
    alchemyProvider({ alchemyId: "YYSM9h2qi8roiMLedCEOntA2Jk3fe10W" }),
    // jsonRpcProvider({
    //   rpc: (chain) => ({
    //     // http: `https://rpc.valist.io/mumbai`,
    //     // http: "https://rpc-mumbai.matic.today",
    //   }),
    // }),
    // publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Split/3',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Split/3</title>
        <meta name="description" content="Split3" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ConnectButton />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

const NoSsr = (props: any) => (
  <React.Fragment><MyApp {...props}></MyApp></React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
});

// export default MyApp;
