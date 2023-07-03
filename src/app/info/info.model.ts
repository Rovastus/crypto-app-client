export interface WalletTableDataI {
  rows: WalletTableRowI[];
  fiat: string;
  fiatImagePath: string;
  totalEarnOrloss: string;
}

export interface WalletTableRowI {
  id: number;
  coin: string;
  coinImagePath: string;
  total: string;
  avcoFiatPerUnit: string;
  earnOrLoss: string;
}
