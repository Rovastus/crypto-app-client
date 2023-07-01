import { FiatEnum, TaxMethodEnum } from 'src/generated/graphql';

export type ENUM_LIST_VALUE<T> = {
  key: string;
  value: T;
};

export type ENUM_LIST<T> = ENUM_LIST_VALUE<T>[];

export const FIAT_LIST = enumToList(FiatEnum);
export const TAX_METHOD_LIST = enumToList(TaxMethodEnum);

function enumToList<T>(enumType: { [s: string]: T }): ENUM_LIST<T> {
  return Object.entries(enumType).map(([key, value]) => ({
    key,
    value,
  }));
}
