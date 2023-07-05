export interface WalletsTableDataI {
  rows: WalletTableRowI[];
  fiat: string;
  fiatImagePath: string;
  totalEarnOrloss: string;
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
