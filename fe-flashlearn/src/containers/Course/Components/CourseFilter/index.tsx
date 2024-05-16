/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE } from '@appConfig';
import { Select, TableQueryParams } from '@components';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { getErrorMessage, isEmpty } from '@utils';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  COURSE_FILTER_QUERY_KEY,
  CourseFilterFormValue,
  ratingOptions,
  wordOptions,
} from './helpers';

const CourseFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const handleSubmitSearchAndFilter = (values: CourseFilterFormValue) => {
    const { rating, wordCount } = values;
    query.delete(TableQueryParams._PAGE);

    if (!isEmpty(rating)) {
      query.set(COURSE_FILTER_QUERY_KEY.Rating, rating.toString());
    } else {
      query.delete(COURSE_FILTER_QUERY_KEY.Rating);
    }

    if (!isEmpty(wordCount)) {
      query.set(COURSE_FILTER_QUERY_KEY.WordCount, wordCount);
    } else {
      query.delete(COURSE_FILTER_QUERY_KEY.WordCount);
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const handleClearAll = () => {
    setValues({
      rating: null,
      wordCount: null,
    });
    query.delete(COURSE_FILTER_QUERY_KEY.Rating);
    query.delete(COURSE_FILTER_QUERY_KEY.WordCount);
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const initialValue: CourseFilterFormValue = useMemo(
    () => ({
      rating: searchValues.rating || null,
      wordCount: searchValues.wordCount || null,
    }),
    [searchValues],
  );

  const formik = useFormik<CourseFilterFormValue>({
    initialValues: initialValue,
    onSubmit: handleSubmitSearchAndFilter,
  });
  const { setValues, handleSubmit, getFieldProps, touched, errors } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filters
        </Typography>
      </Stack>

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                label="Select Rating"
                placeholder="Choose a Rating"
                required
                size="small"
                {...getFieldProps(COURSE_FILTER_QUERY_KEY.Rating)}
                options={ratingOptions}
                errorMessage={getFieldErrorMessage(COURSE_FILTER_QUERY_KEY.Rating)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Select Word Count"
                placeholder="Choose a word count"
                required
                size="small"
                {...getFieldProps(COURSE_FILTER_QUERY_KEY.WordCount)}
                options={wordOptions}
                errorMessage={getFieldErrorMessage(COURSE_FILTER_QUERY_KEY.WordCount)}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClearAll}>
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  );
};

type Props = {
  searchValues: CourseFilterFormValue;
  handleClosePopup?: (..._args: any[]) => void;
};

export default CourseFilter;
