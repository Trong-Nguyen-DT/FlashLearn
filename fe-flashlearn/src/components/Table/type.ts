export type TableParams = {
  page?: number | string;
  perPage?: number | string;
  sort?: string;
  searchText?: string;
  [key: string]: number | boolean | string | string[] | undefined;
};
