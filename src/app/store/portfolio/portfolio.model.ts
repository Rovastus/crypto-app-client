import { FiatEnum, TaxMethodEnum } from 'src/generated/graphql';

export interface PortfolioNameI {
  id: number;
  name: string;
}

export interface WalletI {
  id: number;
  amount: string;
  coin: string;
  avcoFiatPerUnit: string;
}

export interface PortfolioI {
  id: number;
  name: string;
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
  wallets: WalletI[];
}

export interface CreatePortfolioI {
  name: string;
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
}
