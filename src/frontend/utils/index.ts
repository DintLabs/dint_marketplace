import * as _ from 'lodash';
import { ETHERIUM, POLYGON_MAINNET, SOLANA_MAINNET } from '../web3/model';

export const OPTIONS_NETWORK_STAD = {
  ERC_20: {
    name: 'TOKEN',
    key: 'ERC_20',
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId]
  },
  TOKEN_721: {
    name: 'TOKEN 721',
    key: 'ERC_721',
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId]
  },
  TOKEN_1155: {
    name: 'TOKEN 1155',
    key: 'ERC_1155',
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId]
  },
  NFT: {
    name: 'NFT',
    key: 'NFT',
    networks: [SOLANA_MAINNET.uniqueId]
  },
  SPL: {
    name: 'TOKEN',
    key: 'SPL',
    networks: [SOLANA_MAINNET.uniqueId]
  }
};

export const IS_TOKEN = (networkStandard: string) => ['ERC_20', 'SPL'].includes(networkStandard);

export const IS_NFT = (networkStandard: string) =>
  ['NFT', 'ERC_721', 'ERC_1155'].includes(networkStandard);

const CONTRACT_TYPE_MORALIS = {
  TOKEN_1155: 'ERC1155',
  TOKEN_721: 'ERC721'
};

export const FILTER_OWNER_NFT_EVM = (
  nfts: any,
  { token_address, owner_of }: { token_address: string; owner_of: string; contract_type?: string }
) =>
  nfts.token_address.toLowerCase() === token_address.toLowerCase() &&
  nfts.owner_of.toLowerCase() === owner_of.toLowerCase();

export const FILTER_OWNER_SOL = (nfts: any, { owner_of }: { owner_of: string }) =>
  nfts.associatedTokenAddress.toLowerCase() === owner_of.toLowerCase();

export function groupBy(objectArray: any, property: any) {
  try {
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  } catch (error) {
    return null;
  }
}

export function isIPhone() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

export const isBrowser = typeof window !== 'undefined';

export const hasEthereum = isBrowser && _.has(window, 'ethereum');

export const isMetamask = isIPhone() && hasEthereum;
