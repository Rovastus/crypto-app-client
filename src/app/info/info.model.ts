export interface WalletsTableDataI {
  rows: WalletTableRowI[];
  fiat: string;
  fiatImagePath: string;
  totalEarnOrLoss: string;
}

export interface WalletTableRowI {
  id: number;
  coin: string;
  coinAmount: string;
  coinImagePath: string;
  total: string;
  avcoFiatPerUnit: string;
  earnOrLoss: string;
}
