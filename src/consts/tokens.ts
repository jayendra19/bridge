import { WarpCoreConfig } from '@hyperlane-xyz/sdk';

// A list of Warp UI token configs
// Tokens can be defined here, in tokens.json, or in tokens.yaml
// The input here is typically the output of the Hyperlane CLI warp deploy command
export const tokenConfigs: WarpCoreConfig = {
  tokens: [
    // {
    //   // The ChainName of the token
    //   chainName: 'polygon',
    //   // See https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/token/TokenStandard.ts
    //   standard: TokenStandard.EvmHypCollateral,
    //   // The token metadata (decimals, symbol, name)
    //   decimals: 18,
    //   symbol: 'DEOD',
    //   name: 'Decentrawood',
    //   // The router address
    //   addressOrDenom: '0xD5dB603afded61889043F3b8cf3Da7530cBa3E9a',
    //   // The address of the underlying collateral token
    //   collateralAddress: '0xE77aBB1E75D2913B2076DD16049992FFeACa5235',
    //   // A path to a token logo image
    //   logoURI: '/logos/usdc.png',
    //   // The list of tokens this one is connected to
    //   connections: [{ token: 'ethereum|bsc|0x7f4B7431a4E1B9f375EF0A94224eA4Ef09B4F668' }],
    // },
    // {
    //   chainName: 'bsc',
    //   standard: TokenStandard.EvmHypSynthetic,
    //   decimals: 18,
    //   symbol: 'Deod',
    //   name: 'Decentrawood',
    //   addressOrDenom: '0x7f4B7431a4E1B9f375EF0A94224eA4Ef09B4F668',
    //   logoURI: '/logos/weth.png',
    //   connections: [{ token: 'ethereum|polygon|0xD5dB603afded61889043F3b8cf3Da7530cBa3E9a' }],
    // },
  ],
  options: {},
};
