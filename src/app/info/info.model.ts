export interface PortfolioTableDataI {
  rows: PortfolioTableRowI[];
  fiat: string;
  fiatImagePath: string;
  totalProfitOrloss: string;
}

export interface PortfolioTableRowI {
  id: number;
  coin: string;
  coinImagePath: string;
  total: string;
  avcoFiatPerUnit: string;
  profitOrLoss: string;
}
