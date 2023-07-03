export interface TransactionI {
  id: number;
  time: string;
  buy: string;
  buyCoin: string;
  price: string;
  priceCoin: string;
  fee: string;
  feeCoin: string;
  transactionTaxEvents: TransactionTaxEventI[];
}

export interface TransactionTaxEventI {
  id: number;
  gainInFiat: string;
  expensesInFiat: string;
}
