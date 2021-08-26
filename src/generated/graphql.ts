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

export type CryptoCoinInWallet = {
  __typename?: 'CryptoCoinInWallet';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  amount: Scalars['Decimal'];
  amountCoin: Scalars['String'];
  remainAmount: Scalars['Decimal'];
  expensesInFiat: Scalars['Decimal'];
  portpholioId: Scalars['BigInt'];
  portpholio: Portpholio;
  earn?: Maybe<Earn>;
  transaction?: Maybe<Transaction>;
  transactionExpensesDetail: Array<TransactionExpensesDetail>;
};


export type CryptoCoinInWalletTransactionExpensesDetailArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionExpensesDetailWhereUniqueInput>;
  after?: Maybe<TransactionExpensesDetailWhereUniqueInput>;
};

export type CryptoCoinInWalletWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};



export type Deposit = {
  __typename?: 'Deposit';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  amount: Scalars['Decimal'];
  amountCoin: Scalars['String'];
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
  earnTaxEventId: Scalars['BigInt'];
  earnTaxEvent: EarnTaxEvent;
  cryptoCoinInWalletId: Scalars['BigInt'];
  cryptoCoinInWallet: CryptoCoinInWallet;
};

export type EarnTaxEvent = {
  __typename?: 'EarnTaxEvent';
  id: Scalars['BigInt'];
  gainInFiat: Scalars['Decimal'];
  earn?: Maybe<Earn>;
};

export type EarnTaxEventWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
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
  Eur = 'EUR',
  Usd = 'USD'
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
  cryptoCoinInWallet: Array<CryptoCoinInWallet>;
};


export type PortpholioExportsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ExportWhereUniqueInput>;
  after?: Maybe<ExportWhereUniqueInput>;
};


export type PortpholioCryptoCoinInWalletArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CryptoCoinInWalletWhereUniqueInput>;
  after?: Maybe<CryptoCoinInWalletWhereUniqueInput>;
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
  cryptoCoinInWallets: Array<CryptoCoinInWallet>;
  cryptoCoinInWallet?: Maybe<CryptoCoinInWallet>;
  deposits: Array<Deposit>;
  deposit?: Maybe<Deposit>;
  earns: Array<Earn>;
  earn?: Maybe<Earn>;
  earnTaxEvents: Array<EarnTaxEvent>;
  earnTaxEvent?: Maybe<EarnTaxEvent>;
  exports: Array<Export>;
  export?: Maybe<Export>;
  portpholios: Array<Portpholio>;
  portpholio?: Maybe<Portpholio>;
  transactions: Array<Transaction>;
  transaction?: Maybe<Transaction>;
  transactionExpensesDetails: Array<TransactionExpensesDetail>;
  transactionExpensesDetail?: Maybe<TransactionExpensesDetail>;
  transactionTaxEvents: Array<TransactionTaxEvent>;
  transactionTaxEvent?: Maybe<TransactionTaxEvent>;
  withdraws: Array<Withdraw>;
  withdraw?: Maybe<Withdraw>;
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


export type QueryCryptoCoinInWalletsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CryptoCoinInWalletWhereUniqueInput>;
  after?: Maybe<CryptoCoinInWalletWhereUniqueInput>;
};


export type QueryCryptoCoinInWalletArgs = {
  where: CryptoCoinInWalletWhereUniqueInput;
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


export type QueryEarnsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<EarnWhereUniqueInput>;
  after?: Maybe<EarnWhereUniqueInput>;
};


export type QueryEarnArgs = {
  where: EarnWhereUniqueInput;
};


export type QueryEarnTaxEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<EarnTaxEventWhereUniqueInput>;
  after?: Maybe<EarnTaxEventWhereUniqueInput>;
};


export type QueryEarnTaxEventArgs = {
  where: EarnTaxEventWhereUniqueInput;
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


export type QueryTransactionExpensesDetailsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionExpensesDetailWhereUniqueInput>;
  after?: Maybe<TransactionExpensesDetailWhereUniqueInput>;
};


export type QueryTransactionExpensesDetailArgs = {
  where: TransactionExpensesDetailWhereUniqueInput;
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


export type QueryWithdrawsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<WithdrawWhereUniqueInput>;
  after?: Maybe<WithdrawWhereUniqueInput>;
};


export type QueryWithdrawArgs = {
  where: WithdrawWhereUniqueInput;
};

export enum TaxMethod {
  Fifo = 'FIFO',
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
  cryptoCoinInWalletId: Scalars['BigInt'];
  cryptoCoinInWallet: CryptoCoinInWallet;
  transactionTaxEvent?: Maybe<TransactionTaxEvent>;
};

export type TransactionExpensesDetail = {
  __typename?: 'TransactionExpensesDetail';
  id: Scalars['BigInt'];
  amount: Scalars['Decimal'];
  expensesInFiat: Scalars['Decimal'];
  cryptoCoinInWalletId: Scalars['BigInt'];
  cryptoCoinInWallet: CryptoCoinInWallet;
  transactionTaxEventId: Scalars['BigInt'];
  transactionTaxEvent: TransactionTaxEvent;
};

export type TransactionExpensesDetailWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type TransactionTaxEvent = {
  __typename?: 'TransactionTaxEvent';
  id: Scalars['BigInt'];
  gainInFiat: Scalars['Decimal'];
  expensesInFiat: Scalars['Decimal'];
  transactionId: Scalars['BigInt'];
  transaction: Transaction;
  transactionExpensesDetail: Array<TransactionExpensesDetail>;
};


export type TransactionTaxEventTransactionExpensesDetailArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<TransactionExpensesDetailWhereUniqueInput>;
  after?: Maybe<TransactionExpensesDetailWhereUniqueInput>;
};

export type TransactionTaxEventWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type TransactionWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type Withdraw = {
  __typename?: 'Withdraw';
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
  amount: Scalars['Decimal'];
  amountCoin: Scalars['String'];
  exportId: Scalars['BigInt'];
  export: Export;
};

export type WithdrawWhereUniqueInput = {
  id?: Maybe<Scalars['BigInt']>;
};

export type ImportExportMutationVariables = Exact<{
  portpholioId: Scalars['BigInt'];
  name: Scalars['String'];
  jsonData: Array<ProcessExportInput> | ProcessExportInput;
}>;


export type ImportExportMutation = { __typename?: 'Mutation', importExport?: Maybe<{ __typename?: 'Export', id: any, name: string }> };

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


export type GetPortpholioByIdQuery = { __typename?: 'Query', portpholio?: Maybe<{ __typename?: 'Portpholio', id: any, name: string, taxMethod: TaxMethod, fiat: Fiat }> };

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