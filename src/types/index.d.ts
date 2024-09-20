declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface PaginationProps {
  page: number;
  totalPages: number;
}
