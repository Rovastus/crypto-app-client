export interface EarnsTableDataI {
  rows: EarnTableRowI[];
}

export interface EarnTableRowI {
  id: number;
  time: string;
  amount: string;
  amountCoin: string;
  amountCoinImagePath: string;
}
