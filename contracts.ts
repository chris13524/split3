import { Signer as EthersSigner, providers } from "ethers";
import { useContract, useContractRead } from "wagmi";

export type Signer = EthersSigner | providers.Provider | null | undefined;

function config(signer: Signer) {
  return {
    addressOrName: {
      80001: "0x5F20f3Ff685c66ABf2947F01f1cC55C99B1e40d9",
    }[process.env.CHAIN_ID || 80001]!,
    contractInterface: require("./artifacts/contracts/Split3.sol/Split3.json").abi,
    signerOrProvider: signer,
  };
}

export function useSplitContract(signer: Signer) {
  return useContract(config(signer));
}

export function useSplitContractRead(signer: Signer, functionName: string, args: any[]) {
  return useContractRead(config(signer), functionName, { args });
}
