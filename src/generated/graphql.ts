import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** An arbitrary-precision Decimal type */
  Decimal: { input: any; output: any; }
};

export type CoinPair = {
  __typename?: 'CoinPair';
  id: Scalars['BigInt']['output'];
  pair: Scalars['String']['output'];
  pairPriceHistories: Array<CoinPairPriceHistory>;
};

export type CoinPairPriceHistory = {
  __typename?: 'CoinPairPriceHistory';
  coinPair: CoinPair;
  id: Scalars['BigInt']['output'];
  price: Scalars['Decimal']['output'];
  time: Scalars['Date']['output'];
  url: Scalars['String']['output'];
};

export type CoinPairPriceHistoryKraken = {
  __typename?: 'CoinPairPriceHistoryKraken';
  closePrice: Scalars['Decimal']['output'];
  coinPair: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  openPrice: Scalars['Decimal']['output'];
  time: Scalars['Date']['output'];
};

export type CoinPairPriceHistoryKrakenJsonData = {
  closePrice: Scalars['String']['input'];
  openPrice: Scalars['String']['input'];
  utcTimeUnix: Scalars['Int']['input'];
};

export type Earn = {
  __typename?: 'Earn';
  amount: Scalars['Decimal']['output'];
  amountCoin: Scalars['String']['output'];
  file: File;
  id: Scalars['BigInt']['output'];
  time: Scalars['Date']['output'];
};

export enum FiatEnum {
  Eur = 'EUR'
}

export type File = {
  __typename?: 'File';
  earns: Array<Earn>;
  id: Scalars['BigInt']['output'];
  jsonData: Scalars['String']['output'];
  name: Scalars['String']['output'];
  portfolio: Portfolio;
  portfolioId: Scalars['BigInt']['output'];
  transactions: Array<Transaction>;
  transfers: Array<Transfer>;
};

export type FileJsonData = {
  data: Scalars['String']['input'];
  description: Scalars['String']['input'];
  operation: Scalars['String']['input'];
  utcTime: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPortfolio: Portfolio;
  importCoinPairPriceHistoryKrakenData: Scalars['String']['output'];
  importFile: Array<File>;
  initCoinPairs: Scalars['String']['output'];
};


export type MutationCreatePortfolioArgs = {
  fiat: FiatEnum;
  name: Scalars['String']['input'];
  taxMethod: TaxMethodEnum;
};


export type MutationImportCoinPairPriceHistoryKrakenDataArgs = {
  coinPair: Scalars['String']['input'];
  jsonData: Array<CoinPairPriceHistoryKrakenJsonData>;
};


export type MutationImportFileArgs = {
  jsonData: Array<FileJsonData>;
  name: Scalars['String']['input'];
  portfolioId: Scalars['BigInt']['input'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  fiat: FiatEnum;
  files: Array<File>;
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  taxMethod: TaxMethodEnum;
  walletHistories: Array<WalletHistory>;
  wallets: Array<Wallet>;
};

export type Query = {
  __typename?: 'Query';
  allPortfolios: Array<Portfolio>;
  earnsByPortfolioId: Array<Earn>;
  filesByPortfolioId: Array<File>;
  getPortfolioById: Portfolio;
  transactionsByPortfolioId: Array<Transaction>;
};


export type QueryEarnsByPortfolioIdArgs = {
  portfolioId: Scalars['BigInt']['input'];
};


export type QueryFilesByPortfolioIdArgs = {
  portfolioId: Scalars['BigInt']['input'];
};


export type QueryGetPortfolioByIdArgs = {
  portfolioId: Scalars['BigInt']['input'];
};


export type QueryTransactionsByPortfolioIdArgs = {
  portfolioId: Scalars['BigInt']['input'];
};

export enum TaxMethodEnum {
  Avco = 'AVCO'
}

export type Transaction = {
  __typename?: 'Transaction';
  buy: Scalars['Decimal']['output'];
  buyCoin: Scalars['String']['output'];
  fee: Scalars['Decimal']['output'];
  feeCoin: Scalars['String']['output'];
  file: File;
  id: Scalars['BigInt']['output'];
  price: Scalars['Decimal']['output'];
  priceCoin: Scalars['String']['output'];
  time: Scalars['Date']['output'];
  transactionTaxEvents: Array<TransactionTaxEvent>;
};

export type TransactionTaxEvent = {
  __typename?: 'TransactionTaxEvent';
  expensesInFiat: Scalars['Decimal']['output'];
  gainInFiat: Scalars['Decimal']['output'];
  id: Scalars['BigInt']['output'];
  transaction: Transaction;
  type: TransactionTaxEventTypeEnum;
};

export enum TransactionTaxEventTypeEnum {
  Buy = 'BUY',
  Fee = 'FEE'
}

export type Transfer = {
  __typename?: 'Transfer';
  fee: Scalars['Decimal']['output'];
  feeCoin: Scalars['String']['output'];
  file: File;
  id: Scalars['BigInt']['output'];
  time: Scalars['Date']['output'];
};

export type Wallet = {
  __typename?: 'Wallet';
  amount: Scalars['Decimal']['output'];
  avcoFiatPerUnit: Scalars['Decimal']['output'];
  coin: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  portfolio: Portfolio;
  portfolioId: Scalars['BigInt']['output'];
  totalFiat: Scalars['Decimal']['output'];
};

export type WalletHistory = {
  __typename?: 'WalletHistory';
  coin: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  newAmount: Scalars['Decimal']['output'];
  newAvcoFiatPerUnit: Scalars['Decimal']['output'];
  newTotalFiat: Scalars['Decimal']['output'];
  oldAmount: Scalars['Decimal']['output'];
  oldAvcoFiatPerUnit: Scalars['Decimal']['output'];
  oldTotalFiat: Scalars['Decimal']['output'];
  portfolio: Portfolio;
  portfolioId: Scalars['BigInt']['output'];
};

export type EarnsByPortfolioIdQueryVariables = Exact<{
  portfolioId: Scalars['BigInt']['input'];
}>;


export type EarnsByPortfolioIdQuery = { __typename?: 'Query', earnsByPortfolioId: Array<{ __typename?: 'Earn', id: any, time: any, amount: any, amountCoin: string }> };

export type ImportFileMutationVariables = Exact<{
  portfolioId: Scalars['BigInt']['input'];
  name: Scalars['String']['input'];
  jsonData: Array<FileJsonData> | FileJsonData;
}>;


export type ImportFileMutation = { __typename?: 'Mutation', importFile: Array<{ __typename?: 'File', id: any, name: string }> };

export type FilesByPortfolioIdQueryVariables = Exact<{
  portfolioId: Scalars['BigInt']['input'];
}>;


export type FilesByPortfolioIdQuery = { __typename?: 'Query', filesByPortfolioId: Array<{ __typename?: 'File', id: any, name: string }> };

export type ImportCoinPairPriceHistoryKrakenDataMutationVariables = Exact<{
  coinPair: Scalars['String']['input'];
  jsonData: Array<CoinPairPriceHistoryKrakenJsonData> | CoinPairPriceHistoryKrakenJsonData;
}>;


export type ImportCoinPairPriceHistoryKrakenDataMutation = { __typename?: 'Mutation', importCoinPairPriceHistoryKrakenData: string };

export type CreatePortfolioMutationVariables = Exact<{
  name: Scalars['String']['input'];
  taxMethod: TaxMethodEnum;
  fiat: FiatEnum;
}>;


export type CreatePortfolioMutation = { __typename?: 'Mutation', createPortfolio: { __typename?: 'Portfolio', id: any, name: string } };

export type AllPortfoliosQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPortfoliosQuery = { __typename?: 'Query', allPortfolios: Array<{ __typename?: 'Portfolio', id: any, name: string }> };

export type GetPortfolioByIdQueryVariables = Exact<{
  portfolioId: Scalars['BigInt']['input'];
}>;


export type GetPortfolioByIdQuery = { __typename?: 'Query', getPortfolioById: { __typename?: 'Portfolio', id: any, name: string, taxMethod: TaxMethodEnum, fiat: FiatEnum, wallets: Array<{ __typename?: 'Wallet', id: any, amount: any, coin: string, avcoFiatPerUnit: any }> } };

export type TransactionsByPortfolioIdQueryVariables = Exact<{
  portfolioId: Scalars['BigInt']['input'];
}>;


export type TransactionsByPortfolioIdQuery = { __typename?: 'Query', transactionsByPortfolioId: Array<{ __typename?: 'Transaction', id: any, time: any, buy: any, buyCoin: string, price: any, priceCoin: string, fee: any, feeCoin: string, transactionTaxEvents: Array<{ __typename?: 'TransactionTaxEvent', id: any, gainInFiat: any, expensesInFiat: any }> }> };

export const EarnsByPortfolioIdDocument = gql`
    query earnsByPortfolioId($portfolioId: BigInt!) {
  earnsByPortfolioId(portfolioId: $portfolioId) {
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
export class EarnsByPortfolioIdGQL extends Apollo.Query<EarnsByPortfolioIdQuery, EarnsByPortfolioIdQueryVariables> {
  document = EarnsByPortfolioIdDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ImportFileDocument = gql`
    mutation importFile($portfolioId: BigInt!, $name: String!, $jsonData: [FileJsonData!]!) {
  importFile(portfolioId: $portfolioId, name: $name, jsonData: $jsonData) {
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
export const FilesByPortfolioIdDocument = gql`
    query filesByPortfolioId($portfolioId: BigInt!) {
  filesByPortfolioId(portfolioId: $portfolioId) {
    id
    name
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class FilesByPortfolioIdGQL extends Apollo.Query<FilesByPortfolioIdQuery, FilesByPortfolioIdQueryVariables> {
  document = FilesByPortfolioIdDocument;

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
export const CreatePortfolioDocument = gql`
    mutation createPortfolio($name: String!, $taxMethod: TaxMethodEnum!, $fiat: FiatEnum!) {
  createPortfolio(name: $name, taxMethod: $taxMethod, fiat: $fiat) {
    id
    name
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class CreatePortfolioGQL extends Apollo.Mutation<CreatePortfolioMutation, CreatePortfolioMutationVariables> {
  document = CreatePortfolioDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AllPortfoliosDocument = gql`
    query allPortfolios {
  allPortfolios {
    id
    name
  }
}
    `;

@Injectable({
  providedIn: 'root'
})
export class AllPortfoliosGQL extends Apollo.Query<AllPortfoliosQuery, AllPortfoliosQueryVariables> {
  document = AllPortfoliosDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetPortfolioByIdDocument = gql`
    query getPortfolioById($portfolioId: BigInt!) {
  getPortfolioById(portfolioId: $portfolioId) {
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
export class GetPortfolioByIdGQL extends Apollo.Query<GetPortfolioByIdQuery, GetPortfolioByIdQueryVariables> {
  document = GetPortfolioByIdDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TransactionsByPortfolioIdDocument = gql`
    query transactionsByPortfolioId($portfolioId: BigInt!) {
  transactionsByPortfolioId(portfolioId: $portfolioId) {
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
export class TransactionsByPortfolioIdGQL extends Apollo.Query<TransactionsByPortfolioIdQuery, TransactionsByPortfolioIdQueryVariables> {
  document = TransactionsByPortfolioIdDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}