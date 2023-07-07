import { FiatEnum, TaxMethodEnum } from 'src/generated/graphql';

export interface PortfolioI {
  id: number;
  name: string;
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
  coins: string[];
}

export interface CreatePortfolioI {
  name: string;
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
}
