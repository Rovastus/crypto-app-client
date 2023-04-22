import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  after?: InputMaybe<CoinPairPriceHistoryWhereUniqueInput>;
  before?: InputMaybe<CoinPairPriceHistoryWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CoinPairPriceHistory = {
  __typename?: 'CoinPairPriceHistory';
  coinPair: CoinPair;
  coinPairId: Scalars['BigInt'];
  id: Scalars['BigInt'];
  price: Scalars['Decimal'];
  time: Scalars['DateTime'];
  url: Scalars['String'];
};

export type CoinPairPriceHistoryKraken = {
  __typename?: 'CoinPairPriceHistoryKraken';
  closePrice: Scalars['Decimal'];
  coinPair: Scalars['String'];
  id: Scalars['BigInt'];
  openPrice: Scalars['Decimal'];
  time: Scalars['DateTime'];
};

export type CoinPairPriceHistoryKrakenFileInput = {
  closePrice: Scalars['String'];
  openPrice: Scalars['String'];
  utcTime: Scalars['String'];
};

export type CoinPairPriceHistoryKrakenWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
};

export type CoinPairPriceHistoryTime_CoinPairId_UniqueCompoundUniqueInput = {
  coinPairId: Scalars['BigInt'];
  time: Scalars['DateTime'];
};

export type CoinPairPriceHistoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
  time_coinPairId_unique?: InputMaybe<CoinPairPriceHistoryTime_CoinPairId_UniqueCompoundUniqueInput>;
};

export type CoinPairWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
  pair?: InputMaybe<Scalars['String']>;
};

export type Earn = {
  __typename?: 'Earn';
  amount: Scalars['Decimal'];
  amountCoin: Scalars['String'];
  file: File;
  fileId: Scalars['BigInt'];
  id: Scalars['BigInt'];
  time: Scalars['DateTime'];
};

export type EarnWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
};

export enum Fiat {
  Eur = 'EUR'
}

export type File = {
  __typename?: 'File';
  earn: Array<Earn>;
  id: Scalars['BigInt'];
  jsonData: Scalars['String'];
  name: Scalars['String'];
  portpholio: Portpholio;
  portpholioId: Scalars['BigInt'];
  transaction: Array<Transaction>;
};


export type FileEarnArgs = {
  after?: InputMaybe<EarnWhereUniqueInput>;
  before?: InputMaybe<EarnWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type FileTransactionArgs = {
  after?: InputMaybe<TransactionWhereUniqueInput>;
  before?: InputMaybe<TransactionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type FileWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPortpholio?: Maybe<Portpholio>;
  importCoinPairPriceHistoryKrakenData?: Maybe<Scalars['String']>;
  importFile?: Maybe<File>;
  initCoinPairs?: Maybe<Array<Maybe<CoinPair>>>;
};


export type MutationCreatePortpholioArgs = {
  fiat: Fiat;
  name: Scalars['String'];
  taxMethod: TaxMethod;
};


export type MutationImportCoinPairPriceHistoryKrakenDataArgs = {
  coinPair: Scalars['String'];
  jsonData: Array<CoinPairPriceHistoryKrakenFileInput>;
};


export type MutationImportFileArgs = {
  jsonData: Array<ProcessFileInput>;
  name: Scalars['String'];
  portpholioId: Scalars['BigInt'];
};

export type Portpholio = {
  __typename?: 'Portpholio';
  fiat: Fiat;
  files: Array<File>;
  id: Scalars['BigInt'];
  name: Scalars['String'];
  taxMethod: TaxMethod;
  wallet: Array<Wallet>;
};


export type PortpholioFilesArgs = {
  after?: InputMaybe<FileWhereUniqueInput>;
  before?: InputMaybe<FileWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PortpholioWalletArgs = {
  after?: InputMaybe<WalletWhereUniqueInput>;
  before?: InputMaybe<WalletWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PortpholioWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProcessFileInput = {
  change: Scalars['Float'];
  coin: Scalars['String'];
  operation: Scalars['String'];
  utcTime: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  coinPair?: Maybe<CoinPair>;
  coinPairPriceHistories: Array<CoinPairPriceHistory>;
  coinPairPriceHistory?: Maybe<CoinPairPriceHistory>;
  coinPairPriceHistoryKraken?: Maybe<CoinPairPriceHistoryKraken>;
  coinPairPriceHistoryKrakens: Array<CoinPairPriceHistoryKraken>;
  coinPairs: Array<CoinPair>;
  earn?: Maybe<Earn>;
  earns: Array<Earn>;
  earnsByPortpholioId: Array<Maybe<Earn>>;
  file?: Maybe<File>;
  files: Array<File>;
  filesByPortpholioId: Array<Maybe<File>>;
  portpholio?: Maybe<Portpholio>;
  portpholios: Array<Portpholio>;
  transaction?: Maybe<Transaction>;
  transactionTaxEvent?: Maybe<TransactionTaxEvent>;
  transactionTaxEvents: Array<TransactionTaxEvent>;
  transactions: Array<Transaction>;
  transactionsByPortpholioId: Array<Maybe<Transaction>>;
  wallet?: Maybe<Wallet>;
  walletHistories: Array<WalletHistory>;
  walletHistory?: Maybe<WalletHistory>;
  wallets: Array<Wallet>;
};


export type QueryCoinPairArgs = {
  where: CoinPairWhereUniqueInput;
};


export type QueryCoinPairPriceHistoriesArgs = {
  after?: InputMaybe<CoinPairPriceHistoryWhereUniqueInput>;
  before?: InputMaybe<CoinPairPriceHistoryWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCoinPairPriceHistoryArgs = {
  where: CoinPairPriceHistoryWhereUniqueInput;
};


export type QueryCoinPairPriceHistoryKrakenArgs = {
  where: CoinPairPriceHistoryKrakenWhereUniqueInput;
};


export type QueryCoinPairPriceHistoryKrakensArgs = {
  after?: InputMaybe<CoinPairPriceHistoryKrakenWhereUniqueInput>;
  before?: InputMaybe<CoinPairPriceHistoryKrakenWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCoinPairsArgs = {
  after?: InputMaybe<CoinPairWhereUniqueInput>;
  before?: InputMaybe<CoinPairWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEarnArgs = {
  where: EarnWhereUniqueInput;
};


export type QueryEarnsArgs = {
  after?: InputMaybe<EarnWhereUniqueInput>;
  before?: InputMaybe<EarnWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEarnsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryFileArgs = {
  where: FileWhereUniqueInput;
};


export type QueryFilesArgs = {
  after?: InputMaybe<FileWhereUniqueInput>;
  before?: InputMaybe<FileWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryFilesByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryPortpholioArgs = {
  where: PortpholioWhereUniqueInput;
};


export type QueryPortpholiosArgs = {
  after?: InputMaybe<PortpholioWhereUniqueInput>;
  before?: InputMaybe<PortpholioWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTransactionArgs = {
  where: TransactionWhereUniqueInput;
};


export type QueryTransactionTaxEventArgs = {
  where: TransactionTaxEventWhereUniqueInput;
};


export type QueryTransactionTaxEventsArgs = {
  after?: InputMaybe<TransactionTaxEventWhereUniqueInput>;
  before?: InputMaybe<TransactionTaxEventWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTransactionsArgs = {
  after?: InputMaybe<TransactionWhereUniqueInput>;
  before?: InputMaybe<TransactionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTransactionsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryWalletArgs = {
  where: WalletWhereUniqueInput;
};


export type QueryWalletHistoriesArgs = {
  after?: InputMaybe<WalletHistoryWhereUniqueInput>;
  before?: InputMaybe<WalletHistoryWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryWalletHistoryArgs = {
  where: WalletHistoryWhereUniqueInput;
};


export type QueryWalletsArgs = {
  after?: InputMaybe<WalletWhereUniqueInput>;
  before?: InputMaybe<WalletWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum TaxMethod {
  Avco = 'AVCO'
}

export type Transaction = {
  __typename?: 'Transaction';
  buy: Scalars['Decimal'];
  buyCoin: Scalars['String'];
  fee: Scalars['Decimal'];
  feeCoin: Scalars['String'];
  file: File;
  fileId: Scalars['BigInt'];
  id: Scalars['BigInt'];
  price: Scalars['Decimal'];
  priceCoin: Scalars['String'];
  time: Scalars['DateTime'];
  transactionTaxEvent: Array<TransactionTaxEvent>;
};


export type TransactionTransactionTaxEventArgs = {
  after?: InputMaybe<TransactionTaxEventWhereUniqueInput>;
  before?: InputMaybe<TransactionTaxEventWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type TransactionTaxEvent = {
  __typename?: 'TransactionTaxEvent';
  expensesInFiat: Scalars['Decimal'];
  gainInFiat: Scalars['Decimal'];
  id: Scalars['BigInt'];
  transaction: Transaction;
  transactionId: Scalars['BigInt'];
  type: TransactionTaxEventType;
};

export enum TransactionTaxEventType {
  Buy = 'BUY',
  Fee = 'FEE'
}

export type TransactionTaxEventWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
};

export type TransactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  amount: Scalars['Decimal'];
  avcoFiatPerUnit: Scalars['Decimal'];
  coin: Scalars['String'];
  id: Scalars['BigInt'];
  portpholio: Portpholio;
  portpholioId: Scalars['BigInt'];
  totalFiat: Scalars['Decimal'];
};

export type WalletHistory = {
  __typename?: 'WalletHistory';
  coin: Scalars['String'];
  id: Scalars['BigInt'];
  newAmount: Scalars['Decimal'];
  newAvcoFiatPerUnit: Scalars['Decimal'];
  newTotalFiat: Scalars['Decimal'];
  oldAmount: Scalars['Decimal'];
  oldAvcoFiatPerUnit: Scalars['Decimal'];
  oldTotalFiat: Scalars['Decimal'];
  portpholio: Portpholio;
  portpholioId: Scalars['BigInt'];
  time: Scalars['DateTime'];
};

export type WalletHistoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
};

export type WalletPortpholioId_Coin_UniqueCompoundUniqueInput = {
  coin: Scalars['String'];
  portpholioId: Scalars['BigInt'];
};

export type WalletWhereUniqueInput = {
  id?: InputMaybe<Scalars['BigInt']>;
  portpholioId_coin_unique?: InputMaybe<WalletPortpholioId_Coin_UniqueCompoundUniqueInput>;
};

export type EarnsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type EarnsByPortpholioIdQuery = { __typename?: 'Query', earnsByPortpholioId: Array<{ __typename?: 'Earn', id: any, time: any, amount: any, amountCoin: string } | null> };

export type ImportFileMutationVariables = Exact<{
  portpholioId: Scalars['BigInt'];
  name: Scalars['String'];
  jsonData: Array<ProcessFileInput> | ProcessFileInput;
}>;


export type ImportFileMutation = { __typename?: 'Mutation', importFile?: { __typename?: 'File', id: any, name: string } | null };

export type FilesByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type FilesByPortpholioIdQuery = { __typename?: 'Query', filesByPortpholioId: Array<{ __typename?: 'File', id: any, name: string } | null> };

export type CreatePortpholioMutationVariables = Exact<{
  name: Scalars['String'];
  taxMethod: TaxMethod;
  fiat: Fiat;
}>;


export type CreatePortpholioMutation = { __typename?: 'Mutation', createPortpholio?: { __typename?: 'Portpholio', id: any, name: string } | null };

export type AllPortpholiosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPortpholiosQuery = { __typename?: 'Query', portpholios: Array<{ __typename?: 'Portpholio', id: any, name: string }> };

export type GetPortpholioByIdQueryVariables = Exact<{
  id: Scalars['BigInt'];
}>;


export type GetPortpholioByIdQuery = { __typename?: 'Query', portpholio?: { __typename?: 'Portpholio', id: any, name: string, taxMethod: TaxMethod, fiat: Fiat, wallet: Array<{ __typename?: 'Wallet', id: any, amount: any, coin: string, avcoFiatPerUnit: any }> } | null };

export type TransactionsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type TransactionsByPortpholioIdQuery = { __typename?: 'Query', transactionsByPortpholioId: Array<{ __typename?: 'Transaction', id: any, time: any, buy: any, buyCoin: string, price: any, priceCoin: string, fee: any, feeCoin: string, transactionTaxEvent: Array<{ __typename?: 'TransactionTaxEvent', id: any, gainInFiat: any, expensesInFiat: any }> } | null> };

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
export const ImportFileDocument = gql`
    mutation importFile($portpholioId: BigInt!, $name: String!, $jsonData: [ProcessFileInput!]!) {
  importFile(portpholioId: $portpholioId, name: $name, jsonData: $jsonData) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportFileGQL extends Apollo.Mutation<ImportFileMutation, ImportFileMutationVariables> {
    document = ImportFileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FilesByPortpholioIdDocument = gql`
    query filesByPortpholioId($portpholioId: BigInt!) {
  filesByPortpholioId(portpholioId: $portpholioId) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FilesByPortpholioIdGQL extends Apollo.Query<FilesByPortpholioIdQuery, FilesByPortpholioIdQueryVariables> {
    document = FilesByPortpholioIdDocument;
    
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