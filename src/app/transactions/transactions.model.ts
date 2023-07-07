export interface TransactionsTableDataI {
  rows: TransactionTableRowI[];
  fiat: string;
  fiatImagePath: string;
  totalFeeGains: string;
  totalFeeExpenses: string;
  totalTradeGains: string;
  totalTradeExpenses: string;
  totalEarnOrLose: string;
}

export interface TransactionTableRowI {
  id: number;
  time: string;
  buy: string;
  buyCoin: string;
  buyCoinImagePath: string;
  price: string;
  priceCoin: string;
  priceCoinImagePath: string;
  fee: string;
  feeCoin: string;
  feeCoinImagePath: string;
  feeGain: string;
  feeExpenses: string;
  tradeGain: string;
  tradeExpenses: string;
  earnOrLose: string;
}
