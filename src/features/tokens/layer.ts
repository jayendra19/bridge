import { ethers } from 'ethers';
import { getChainMetadata } from '../chains/utils';
import { switchNetwork } from '@wagmi/core';
const FEE_AMOUNT = ethers.utils.parseEther('0.0001');
const FEE_RECEIVER = '0xc1156fd8CbA11E4FdEF2Fa885dC14920756153F7';

async function collectFee(values) {
  try {
    // const metadata = await getChainMetadata(values.origin);
    const chainId = getChainMetadata(values.origin).chainId as number;
    const oldprovider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);

    // Fetch the network information
    const network = await oldprovider.getNetwork();

    // Extract the chain ID
    const oldchainId = network.chainId;
    if (oldchainId !== chainId) {
      await switchNetwork({ chainId })
    }
    console.log("netwotk switch....");

    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask or a compatible wallet is required.');
    }

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    const signer = provider.getSigner();

    const tx = await signer.sendTransaction({
      to: FEE_RECEIVER,
      value: FEE_AMOUNT,
    });

    await tx.wait();
    console.log('Fee payment successful:', tx.hash);
    return tx;
  } catch (error) {
    console.log(error)
  }
}

export default collectFee;
