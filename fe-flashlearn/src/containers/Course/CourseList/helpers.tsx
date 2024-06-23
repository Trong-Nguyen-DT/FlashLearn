import { TableQueryParams } from '@components';
import { COURSE_FILTER_QUERY_KEY } from './Components/CourseFilter/helpers';

export const sortOptions = [
  {
    label: 'Đánh giá tăng dần',
    value: 'rating:asc',
  },
  {
    label: 'Đánh giá giảm dần',
    value: 'rating:desc',
  },
  {
    label: 'Số từ tăng dần',
    value: 'wordCount:asc',
  },
  {
    label: 'Số từ giảm dần',
    value: 'wordCount:desc',
  },
];

export const getInitialGridState = (query: URLSearchParams) => {
  let sortOrder;
  if (query?.get(TableQueryParams._SORT)?.includes(':')) {
    const sortOrderSplit = query?.get(TableQueryParams._SORT)?.split(':');
    if (sortOrderSplit.length === 2 && ['asc', 'desc'].includes(sortOrderSplit[1])) {
      sortOrder = {
        name: sortOrderSplit[0],
        direction: sortOrderSplit[1],
      };
    }
  }

  return {
    searchText: query?.get(TableQueryParams._SEARCH)?.trim().toLowerCase(),
    sortOrder,
    itemsPerPage: query?.has(TableQueryParams._ROWS_PER_PAGE)
      ? Number(query.get(TableQueryParams._ROWS_PER_PAGE))
      : 12,
    page: query?.has(TableQueryParams._PAGE) ? Number(query.get(TableQueryParams._PAGE)) : 0,
    rating: query?.has(COURSE_FILTER_QUERY_KEY.Rating)
      ? Number(query.get(COURSE_FILTER_QUERY_KEY.Rating))
      : null,
    wordCount: query?.has(COURSE_FILTER_QUERY_KEY.WordCount)
      ? query.get(COURSE_FILTER_QUERY_KEY.WordCount)
      : null,
  };
};
