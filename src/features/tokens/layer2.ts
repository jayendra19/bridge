import { ethers } from 'ethers';
import { getChainMetadata } from '../chains/utils';
import { switchNetwork } from '@wagmi/core';

// ABI 
const contractABI = [
    "function deposit() external payable",
    "function setAddresses(address _add1, address _add2, address _add3) external onlyOwner",
    "function setRequiredeth(uint _amount) external onlyOwner",
    "function reqAmt() external view returns (uint256)"
  ];

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
    // console.log("netwotk switch....");

    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask or a compatible wallet is required.');
    }

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    const signer = provider.getSigner();

   // Contract address
   const contractAddressPoly = '0x292C7e8B6436BD18ee073A366943B7Ef00F7592c'; // polygon layer contract
   const contractAddressBNB = '0xC0082cD018a297FbFa23d58F31De4Fb264424b50'; // BNB layer contract


  //  console.log('Calling deposit function...',chainId);

   if(chainId === 56){
    const contract = new ethers.Contract(contractAddressBNB, contractABI, signer);
    const requiredAmount = await contract.reqAmt();
    // console.log("Enter in Bsc chain.");
    const tx = await contract.deposit({
      value: requiredAmount,  // Send the fee amount to the contract
    });
 
     await tx.wait();
    //  console.log('Fee payment successful:', tx.hash);
     return tx;
   } else if(chainId === 137) {
    const contract = new ethers.Contract(contractAddressPoly, contractABI, signer);
    const requiredAmount = await contract.reqAmt();
    // console.log("Enter in poly chain.");
    const tx = await contract.deposit({
      value: requiredAmount,  // Send the fee amount to the contract
    });
 
     await tx.wait();
    //  console.log('Fee payment successful:', tx.hash);
     return tx;
   }
  
  } catch (error) {
    // console.log(error)
  }
}

export default collectFee;
