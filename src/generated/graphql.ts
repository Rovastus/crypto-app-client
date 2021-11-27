import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  Decimal: any;
};




export type CoinPair = {
  __typename?: 'CoinPair';
  id: Scalars['BigInt'];
  pair: Scalars['String'];
  pairPriceHistory: Array<CoinPairPriceHistory>;
};


export type CoinPairPairPriceHistoryArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CoinPairPriceHistoryWhereUniqueInput>;
  after?: Maybe<CoinPairPriceHistoryWhereUniqueInput>;
};

export type CoinPairPriceHistory = {
  __typename?: 'CoinPairPriceHistory';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  price: Scalars['Decimal'];
  url: Scalars['String'];
  coinPairId: Scalars['BigInt'];
  coinPair: CoinPair;
};

export type CoinPairPriceHistoryTime_CoinPairId_UniqueCompoundUniqueInput = {
  time: Scalars['DateTime'];
  coinPairId: Scalars['BigInt'];
};

export type CoinPairPriceHistoryWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
  time_coinPairId_unique?: Maybe<CoinPairPriceHistoryTime_CoinPairId_UniqueCompoundUniqueInput>;
};

export type CoinPairWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
  pair?: Maybe<Scalars['String']>;
};



export type Deposit = {
  __typename?: 'Deposit';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  amount: Scalars['Decimal'];
  coin: Scalars['String'];
  exportId: Scalars['BigInt'];
  export: Export;
};

export type DepositWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type Earn = {
  __typename?: 'Earn';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  amount: Scalars['Decimal'];
  amountCoin: Scalars['String'];
  exportId: Scalars['BigInt'];
  export: Export;
};

export type EarnWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type Export = {
  __typename?: 'Export';
  id: Scalars['BigInt'];
  name: Scalars['String'];
  jsonData: Scalars['String'];
  portpholioId: Scalars['BigInt'];
  portpholio: Portpholio;
  deposit: Array<Deposit>;
  earn: Array<Earn>;
  transaction: Array<Transaction>;
  withdraw: Array<Withdraw>;
};


export type ExportDepositArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<DepositWhereUniqueInput>;
  after?: Maybe<DepositWhereUniqueInput>;
};


export type ExportEarnArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<EarnWhereUniqueInput>;
  after?: Maybe<EarnWhereUniqueInput>;
};


export type ExportTransactionArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionWhereUniqueInput>;
  after?: Maybe<TransactionWhereUniqueInput>;
};


export type ExportWithdrawArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<WithdrawWhereUniqueInput>;
  after?: Maybe<WithdrawWhereUniqueInput>;
};

export type ExportWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
  name?: Maybe<Scalars['String']>;
};

export enum Fiat {
  Eur = 'EUR'
}

export type Mutation = {
  __typename?: 'Mutation';
  initCoinPairs?: Maybe<Array<Maybe<CoinPair>>>;
  importExport?: Maybe<Export>;
  createPortpholio?: Maybe<Portpholio>;
};


export type MutationImportExportArgs = {
  portpholioId: Scalars['BigInt'];
  name: Scalars['String'];
  jsonData: Array<ProcessExportInput>;
};


export type MutationCreatePortpholioArgs = {
  name: Scalars['String'];
  taxMethod: TaxMethod;
  fiat: Fiat;
};

export type Portpholio = {
  __typename?: 'Portpholio';
  id: Scalars['BigInt'];
  name: Scalars['String'];
  taxMethod: TaxMethod;
  fiat: Fiat;
  exports: Array<Export>;
  wallet: Array<Wallet>;
};


export type PortpholioExportsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ExportWhereUniqueInput>;
  after?: Maybe<ExportWhereUniqueInput>;
};


export type PortpholioWalletArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<WalletWhereUniqueInput>;
  after?: Maybe<WalletWhereUniqueInput>;
};

export type PortpholioWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
  name?: Maybe<Scalars['String']>;
};

export type ProcessExportInput = {
  utcTime: Scalars['String'];
  operation: Scalars['String'];
  coin: Scalars['String'];
  change: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  coinPairs: Array<CoinPair>;
  coinPair?: Maybe<CoinPair>;
  deposits: Array<Deposit>;
  deposit?: Maybe<Deposit>;
  depositsByPortpholioId: Array<Maybe<Deposit>>;
  earns: Array<Earn>;
  earn?: Maybe<Earn>;
  earnsByPortpholioId: Array<Maybe<Earn>>;
  exports: Array<Export>;
  export?: Maybe<Export>;
  exportsByPortpholioId: Array<Maybe<Export>>;
  portpholios: Array<Portpholio>;
  portpholio?: Maybe<Portpholio>;
  transactions: Array<Transaction>;
  transaction?: Maybe<Transaction>;
  transactionsByPortpholioId: Array<Maybe<Transaction>>;
  transactionTaxEvents: Array<TransactionTaxEvent>;
  transactionTaxEvent?: Maybe<TransactionTaxEvent>;
  wallets: Array<Wallet>;
  wallet?: Maybe<Wallet>;
  walletHistories: Array<WalletHistory>;
  walletHistory?: Maybe<WalletHistory>;
  withdraws: Array<Withdraw>;
  withdraw?: Maybe<Withdraw>;
  withdrawsByPortpholioId: Array<Maybe<Withdraw>>;
};


export type QueryCoinPairsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CoinPairWhereUniqueInput>;
  after?: Maybe<CoinPairWhereUniqueInput>;
};


export type QueryCoinPairArgs = {
  where: CoinPairWhereUniqueInput;
};


export type QueryDepositsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<DepositWhereUniqueInput>;
  after?: Maybe<DepositWhereUniqueInput>;
};


export type QueryDepositArgs = {
  where: DepositWhereUniqueInput;
};


export type QueryDepositsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryEarnsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<EarnWhereUniqueInput>;
  after?: Maybe<EarnWhereUniqueInput>;
};


export type QueryEarnArgs = {
  where: EarnWhereUniqueInput;
};


export type QueryEarnsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryExportsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ExportWhereUniqueInput>;
  after?: Maybe<ExportWhereUniqueInput>;
};


export type QueryExportArgs = {
  where: ExportWhereUniqueInput;
};


export type QueryExportsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryPortpholiosArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<PortpholioWhereUniqueInput>;
  after?: Maybe<PortpholioWhereUniqueInput>;
};


export type QueryPortpholioArgs = {
  where: PortpholioWhereUniqueInput;
};


export type QueryTransactionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionWhereUniqueInput>;
  after?: Maybe<TransactionWhereUniqueInput>;
};


export type QueryTransactionArgs = {
  where: TransactionWhereUniqueInput;
};


export type QueryTransactionsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryTransactionTaxEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionTaxEventWhereUniqueInput>;
  after?: Maybe<TransactionTaxEventWhereUniqueInput>;
};


export type QueryTransactionTaxEventArgs = {
  where: TransactionTaxEventWhereUniqueInput;
};


export type QueryWalletsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<WalletWhereUniqueInput>;
  after?: Maybe<WalletWhereUniqueInput>;
};


export type QueryWalletArgs = {
  where: WalletWhereUniqueInput;
};


export type QueryWalletHistoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<WalletHistoryWhereUniqueInput>;
  after?: Maybe<WalletHistoryWhereUniqueInput>;
};


export type QueryWalletHistoryArgs = {
  where: WalletHistoryWhereUniqueInput;
};


export type QueryWithdrawsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<WithdrawWhereUniqueInput>;
  after?: Maybe<WithdrawWhereUniqueInput>;
};


export type QueryWithdrawArgs = {
  where: WithdrawWhereUniqueInput;
};


export type QueryWithdrawsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};

export enum TaxMethod {
  Avco = 'AVCO'
}

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  buy: Scalars['Decimal'];
  buyCoin: Scalars['String'];
  price: Scalars['Decimal'];
  priceCoin: Scalars['String'];
  fee: Scalars['Decimal'];
  feeCoin: Scalars['String'];
  exportId: Scalars['BigInt'];
  export: Export;
  transactionTaxEvent: Array<TransactionTaxEvent>;
};


export type TransactionTransactionTaxEventArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionTaxEventWhereUniqueInput>;
  after?: Maybe<TransactionTaxEventWhereUniqueInput>;
};

export type TransactionTaxEvent = {
  __typename?: 'TransactionTaxEvent';
  id: Scalars['BigInt'];
  type: TransactionTaxEventType;
  gainInFiat: Scalars['Decimal'];
  expensesInFiat: Scalars['Decimal'];
  transactionId: Scalars['BigInt'];
  transaction: Transaction;
};

export enum TransactionTaxEventType {
  Fee = 'FEE',
  Buy = 'BUY'
}

export type TransactionTaxEventWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type TransactionWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  id: Scalars['BigInt'];
  coin: Scalars['String'];
  amount: Scalars['Decimal'];
  avcoFiatPerUnit: Scalars['Decimal'];
  totalFiat: Scalars['Decimal'];
  portpholioId: Scalars['BigInt'];
  portpholio: Portpholio;
};

export type WalletHistory = {
  __typename?: 'WalletHistory';
  id: Scalars['BigInt'];
  coin: Scalars['String'];
  oldAmount: Scalars['Decimal'];
  oldAvcoFiatPerUnit: Scalars['Decimal'];
  oldTotalFiat: Scalars['Decimal'];
  newAmount: Scalars['Decimal'];
  newAvcoFiatPerUnit: Scalars['Decimal'];
  newTotalFiat: Scalars['Decimal'];
  time: Scalars['DateTime'];
  portpholioId: Scalars['BigInt'];
  portpholio: Portpholio;
};

export type WalletHistoryWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type WalletPortpholioId_Coin_UniqueCompoundUniqueInput = {
  portpholioId: Scalars['BigInt'];
  coin: Scalars['String'];
};

export type WalletWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
  portpholioId_coin_unique?: Maybe<WalletPortpholioId_Coin_UniqueCompoundUniqueInput>;
};

export type Withdraw = {
  __typename?: 'Withdraw';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  amount: Scalars['Decimal'];
  coin: Scalars['String'];
  exportId: Scalars['BigInt'];
  export: Export;
};

export type WithdrawWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type DepositsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type DepositsByPortpholioIdQuery = { __typename?: 'Query', depositsByPortpholioId: Array<Maybe<{ __typename?: 'Deposit', id: any, time: any, amount: any, coin: string }>> };

export type EarnsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type EarnsByPortpholioIdQuery = { __typename?: 'Query', earnsByPortpholioId: Array<Maybe<{ __typename?: 'Earn', id: any, time: any, amount: any, amountCoin: string }>> };

export type ImportExportMutationVariables = Exact<{
  portpholioId: Scalars['BigInt'];
  name: Scalars['String'];
  jsonData: Array<ProcessExportInput> | ProcessExportInput;
}>;


export type ImportExportMutation = { __typename?: 'Mutation', importExport?: Maybe<{ __typename?: 'Export', id: any, name: string }> };

export type ExportsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type ExportsByPortpholioIdQuery = { __typename?: 'Query', exportsByPortpholioId: Array<Maybe<{ __typename?: 'Export', id: any, name: string }>> };

export type CreatePortpholioMutationVariables = Exact<{
  name: Scalars['String'];
  taxMethod: TaxMethod;
  fiat: Fiat;
}>;


export type CreatePortpholioMutation = { __typename?: 'Mutation', createPortpholio?: Maybe<{ __typename?: 'Portpholio', id: any, name: string }> };

export type AllPortpholiosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPortpholiosQuery = { __typename?: 'Query', portpholios: Array<{ __typename?: 'Portpholio', id: any, name: string }> };

export type GetPortpholioByIdQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type GetPortpholioByIdQuery = { __typename?: 'Query', portpholio?: Maybe<{ __typename?: 'Portpholio', id: any, name: string, taxMethod: TaxMethod, fiat: Fiat, wallet: Array<{ __typename?: 'Wallet', id: any, amount: any, coin: string, avcoFiatPerUnit: any }> }> };

export type TransactionsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type TransactionsByPortpholioIdQuery = { __typename?: 'Query', transactionsByPortpholioId: Array<Maybe<{ __typename?: 'Transaction', id: any, time: any, buy: any, buyCoin: string, price: any, priceCoin: string, fee: any, feeCoin: string, transactionTaxEvent: Array<{ __typename?: 'TransactionTaxEvent', id: any, type: TransactionTaxEventType, gainInFiat: any, expensesInFiat: any }> }>> };

export type WithdrawsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type WithdrawsByPortpholioIdQuery = { __typename?: 'Query', withdrawsByPortpholioId: Array<Maybe<{ __typename?: 'Withdraw', id: any, time: any, amount: any, coin: string }>> };

export const DepositsByPortpholioIdDocument = gql`
    query depositsByPortpholioId($portpholioId: BigInt!) {
  depositsByPortpholioId(portpholioId: $portpholioId) {
    id
    time
    amount
    coin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DepositsByPortpholioIdGQL extends Apollo.Query<DepositsByPortpholioIdQuery, DepositsByPortpholioIdQueryVariables> {
    document = DepositsByPortpholioIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EarnsByPortpholioIdDocument = gql`
    query earnsByPortpholioId($portpholioId: BigInt!) {
  earnsByPortpholioId(portpholioId: $portpholioId) {
    id
    time
    amount
    amountCoin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EarnsByPortpholioIdGQL extends Apollo.Query<EarnsByPortpholioIdQuery, EarnsByPortpholioIdQueryVariables> {
    document = EarnsByPortpholioIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ImportExportDocument = gql`
    mutation importExport($portpholioId: BigInt!, $name: String!, $jsonData: [ProcessExportInput!]!) {
  importExport(portpholioId: $portpholioId, name: $name, jsonData: $jsonData) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportExportGQL extends Apollo.Mutation<ImportExportMutation, ImportExportMutationVariables> {
    document = ImportExportDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ExportsByPortpholioIdDocument = gql`
    query exportsByPortpholioId($portpholioId: BigInt!) {
  exportsByPortpholioId(portpholioId: $portpholioId) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExportsByPortpholioIdGQL extends Apollo.Query<ExportsByPortpholioIdQuery, ExportsByPortpholioIdQueryVariables> {
    document = ExportsByPortpholioIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePortpholioDocument = gql`
    mutation createPortpholio($name: String!, $taxMethod: TaxMethod!, $fiat: Fiat!) {
  createPortpholio(name: $name, taxMethod: $taxMethod, fiat: $fiat) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePortpholioGQL extends Apollo.Mutation<CreatePortpholioMutation, CreatePortpholioMutationVariables> {
    document = CreatePortpholioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllPortpholiosDocument = gql`
    query allPortpholios {
  portpholios {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllPortpholiosGQL extends Apollo.Query<AllPortpholiosQuery, AllPortpholiosQueryVariables> {
    document = AllPortpholiosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPortpholioByIdDocument = gql`
    query getPortpholioById($id: BigInt!) {
  portpholio(where: {id: $id}) {
    id
    name
    taxMethod
    fiat
    wallet {
      id
      amount
      coin
      avcoFiatPerUnit
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPortpholioByIdGQL extends Apollo.Query<GetPortpholioByIdQuery, GetPortpholioByIdQueryVariables> {
    document = GetPortpholioByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TransactionsByPortpholioIdDocument = gql`
    query transactionsByPortpholioId($portpholioId: BigInt!) {
  transactionsByPortpholioId(portpholioId: $portpholioId) {
    id
    time
    buy
    buyCoin
    price
    priceCoin
    fee
    feeCoin
    transactionTaxEvent {
      id
      type
      gainInFiat
      expensesInFiat
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TransactionsByPortpholioIdGQL extends Apollo.Query<TransactionsByPortpholioIdQuery, TransactionsByPortpholioIdQueryVariables> {
    document = TransactionsByPortpholioIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const WithdrawsByPortpholioIdDocument = gql`
    query withdrawsByPortpholioId($portpholioId: BigInt!) {
  withdrawsByPortpholioId(portpholioId: $portpholioId) {
    id
    time
    amount
    coin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class WithdrawsByPortpholioIdGQL extends Apollo.Query<WithdrawsByPortpholioIdQuery, WithdrawsByPortpholioIdQueryVariables> {
    document = WithdrawsByPortpholioIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }