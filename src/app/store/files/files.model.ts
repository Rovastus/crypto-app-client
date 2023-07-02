import { FileJsonData } from 'src/generated/graphql';

export interface FileI {
  id: number;
  name: string;
}

export interface CreateFileI {
  portfolioId: number;
  name: string;
  jsonData: FileJsonData;
}
