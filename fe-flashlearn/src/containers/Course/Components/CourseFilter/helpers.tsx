export enum COURSE_FILTER_QUERY_KEY {
  Rating = 'rating',
  WordCount = 'wordCount',
}

export const filterParamsKey = [COURSE_FILTER_QUERY_KEY.Rating, COURSE_FILTER_QUERY_KEY.WordCount];

export type CourseFilterFormValue = {
  rating: number;
  wordCount: string;
};

export const ratingOptions = [
  {
    label: '5 Sao',
    value: '5',
  },
  {
    label: '4 Sao',
    value: '4',
  },
  {
    label: '3 Sao',
    value: '3',
  },
  {
    label: '2 Sao',
    value: '2',
  },
  {
    label: '1 Sao',
    value: '1',
  },
];

export const wordOptions = [
  {
    label: '< 100 từ',
    value: '0:500',
  },
  {
    label: '100 - 200 từ',
    value: '100:200',
  },
  {
    label: '200 - 500 từ',
    value: '200:500',
  },
  {
    label: '> 500 từ',
    value: '500:9999999',
  },
];
