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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
};

export type CoinPair = {
  __typename?: 'CoinPair';
  id: Scalars['BigInt'];
  pair: Scalars['String'];
  pairPriceHistories: Array<CoinPairPriceHistory>;
};

export type CoinPairPriceHistory = {
  __typename?: 'CoinPairPriceHistory';
  coinPair: CoinPair;
  id: Scalars['BigInt'];
  price: Scalars['Decimal'];
  time: Scalars['Date'];
  url: Scalars['String'];
};

export type CoinPairPriceHistoryKraken = {
  __typename?: 'CoinPairPriceHistoryKraken';
  closePrice: Scalars['Decimal'];
  coinPair: Scalars['String'];
  id: Scalars['BigInt'];
  openPrice: Scalars['Decimal'];
  time: Scalars['Date'];
};

export type CoinPairPriceHistoryKrakenJsonData = {
  closePrice: Scalars['String'];
  openPrice: Scalars['String'];
  utcTimeUnix: Scalars['Int'];
};

export type Earn = {
  __typename?: 'Earn';
  amount: Scalars['Decimal'];
  amountCoin: Scalars['String'];
  file: File;
  id: Scalars['BigInt'];
  time: Scalars['Date'];
};

export enum FiatEnum {
  Eur = 'EUR'
}

export type File = {
  __typename?: 'File';
  earns: Array<Earn>;
  id: Scalars['BigInt'];
  jsonData: Scalars['String'];
  name: Scalars['String'];
  portpholio: Portpholio;
  portpholioId: Scalars['BigInt'];
  transactions: Array<Transaction>;
  transfers: Array<Transfer>;
};

export type FileJsonData = {
  birthdate: Scalars['String'];
  height: Scalars['Float'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPortpholio: Portpholio;
  importCoinPairPriceHistoryKrakenData: Scalars['String'];
  importFile: Array<File>;
  initCoinPairs: Scalars['String'];
};


export type MutationCreatePortpholioArgs = {
  fiat: FiatEnum;
  name: Scalars['String'];
  taxMethod: TaxMethodEnum;
};


export type MutationImportCoinPairPriceHistoryKrakenDataArgs = {
  coinPair: Scalars['String'];
  jsonData: Array<CoinPairPriceHistoryKrakenJsonData>;
};


export type MutationImportFileArgs = {
  jsonData: Array<FileJsonData>;
  name: Scalars['String'];
  portpholioId: Scalars['BigInt'];
};

export type Portpholio = {
  __typename?: 'Portpholio';
  fiat: FiatEnum;
  files: Array<File>;
  id: Scalars['BigInt'];
  name: Scalars['String'];
  taxMethod: TaxMethodEnum;
  walletHistories: Array<WalletHistory>;
  wallets: Array<Wallet>;
};

export type Query = {
  __typename?: 'Query';
  allPortpholios: Array<Portpholio>;
  earnsByPortpholioId: Array<Earn>;
  filesByPortpholioId: Array<File>;
  getPortpholioById: Portpholio;
  transactionsByPortpholioId: Array<Transaction>;
};


export type QueryEarnsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryFilesByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryGetPortpholioByIdArgs = {
  portpholioId: Scalars['BigInt'];
};


export type QueryTransactionsByPortpholioIdArgs = {
  portpholioId: Scalars['BigInt'];
};

export enum TaxMethodEnum {
  Avco = 'AVCO'
}

export type Transaction = {
  __typename?: 'Transaction';
  buy: Scalars['Decimal'];
  buyCoin: Scalars['String'];
  fee: Scalars['Decimal'];
  feeCoin: Scalars['String'];
  file: File;
  id: Scalars['BigInt'];
  price: Scalars['Decimal'];
  priceCoin: Scalars['String'];
  time: Scalars['Date'];
  transactionTaxEvents: Array<TransactionTaxEvent>;
};

export type TransactionTaxEvent = {
  __typename?: 'TransactionTaxEvent';
  expensesInFiat: Scalars['Decimal'];
  gainInFiat: Scalars['Decimal'];
  id: Scalars['BigInt'];
  transaction: Transaction;
  type: TransactionTaxEventTypeEnum;
};

export enum TransactionTaxEventTypeEnum {
  Buy = 'BUY',
  Fee = 'FEE'
}

export type Transfer = {
  __typename?: 'Transfer';
  fee: Scalars['Decimal'];
  feeCoin: Scalars['String'];
  file: File;
  id: Scalars['BigInt'];
  time: Scalars['Date'];
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
};

export type EarnsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type EarnsByPortpholioIdQuery = { __typename?: 'Query', earnsByPortpholioId: Array<{ __typename?: 'Earn', id: any, time: any, amount: any, amountCoin: string }> };

export type ImportFileMutationVariables = Exact<{
  portpholioId: Scalars['BigInt'];
  name: Scalars['String'];
  jsonData: Array<FileJsonData> | FileJsonData;
}>;


export type ImportFileMutation = { __typename?: 'Mutation', importFile: Array<{ __typename?: 'File', id: any, name: string }> };

export type FilesByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type FilesByPortpholioIdQuery = { __typename?: 'Query', filesByPortpholioId: Array<{ __typename?: 'File', id: any, name: string }> };

export type ImportCoinPairPriceHistoryKrakenDataMutationVariables = Exact<{
  coinPair: Scalars['String'];
  jsonData: Array<CoinPairPriceHistoryKrakenJsonData> | CoinPairPriceHistoryKrakenJsonData;
}>;


export type ImportCoinPairPriceHistoryKrakenDataMutation = { __typename?: 'Mutation', importCoinPairPriceHistoryKrakenData: string };

export type CreatePortpholioMutationVariables = Exact<{
  name: Scalars['String'];
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
}>;


export type CreatePortpholioMutation = { __typename?: 'Mutation', createPortpholio: { __typename?: 'Portpholio', id: any, name: string } };

export type AllPortpholiosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPortpholiosQuery = { __typename?: 'Query', allPortpholios: Array<{ __typename?: 'Portpholio', id: any, name: string }> };

export type GetPortpholioByIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type GetPortpholioByIdQuery = { __typename?: 'Query', getPortpholioById: { __typename?: 'Portpholio', id: any, name: string, taxMethod: TaxMethodEnum, fiat: FiatEnum, wallets: Array<{ __typename?: 'Wallet', id: any, amount: any, coin: string, avcoFiatPerUnit: any }> } };

export type TransactionsByPortpholioIdQueryVariables = Exact<{
  portpholioId: Scalars['BigInt'];
}>;


export type TransactionsByPortpholioIdQuery = { __typename?: 'Query', transactionsByPortpholioId: Array<{ __typename?: 'Transaction', id: any, time: any, buy: any, buyCoin: string, price: any, priceCoin: string, fee: any, feeCoin: string, transactionTaxEvents: Array<{ __typename?: 'TransactionTaxEvent', id: any, gainInFiat: any, expensesInFiat: any }> }> };

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
    mutation importFile($portpholioId: BigInt!, $name: String!, $jsonData: [FileJsonData!]!) {
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
export const ImportCoinPairPriceHistoryKrakenDataDocument = gql`
    mutation importCoinPairPriceHistoryKrakenData($coinPair: String!, $jsonData: [CoinPairPriceHistoryKrakenJsonData!]!) {
  importCoinPairPriceHistoryKrakenData(coinPair: $coinPair, jsonData: $jsonData)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportCoinPairPriceHistoryKrakenDataGQL extends Apollo.Mutation<ImportCoinPairPriceHistoryKrakenDataMutation, ImportCoinPairPriceHistoryKrakenDataMutationVariables> {
    document = ImportCoinPairPriceHistoryKrakenDataDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePortpholioDocument = gql`
    mutation createPortpholio($name: String!, $taxMethod: TaxMethodEnum!, $fiat: FiatEnum!) {
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
  allPortpholios {
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
    query getPortpholioById($portpholioId: BigInt!) {
  getPortpholioById(portpholioId: $portpholioId) {
    id
    name
    taxMethod
    fiat
    wallets {
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
    transactionTaxEvents {
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