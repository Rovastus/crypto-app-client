export interface TransactionsTableDataI {
  rows: TransactionTableRowI[];
  fiat: string;
  fiatImagePath: string;
  totalEarnOrLose: string;
}

export interface TransactionTableRowI {
  id: number;
  time: string;
  buy: string;
  buyCoinImagePath: string;
  price: string;
  priceCoinImagePath: string;
  fee: string;
  feeCoinImagePath: string;
  feeGain: string;
  feeExpenses: string;
  tradeGain: string;
  tradeExpenses: string;
  earnOrLose: string;
}
