import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { Signer } from "../contracts";

export function useMembers(contract: Contract, signer: Signer) {
    const [members, setMembers] = useState<string[]>();
    useEffect(() => {
        if (!signer) return;
        (async () => {
            setMembers(await contract.getMembers());
        })();
    }, [signer]);
    return members;
}
