import { FiatEnum, TaxMethodEnum } from 'src/generated/graphql';

export interface PortpholioNameI {
  id: number;
  name: string;
}

export interface WalletI {
  id: number;
  amount: string;
  coin: string;
  avcoFiatPerUnit: string;
}

export interface PortpholioI {
  id: number;
  name: string;
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
  wallets: WalletI[];
}
