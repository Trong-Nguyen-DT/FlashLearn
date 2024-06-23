/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from '@appConfig';
import { Image, Loading, TableParams, TableQueryParams } from '@components';
import { Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useGetAllCourse } from '@queries';
import { isEmpty } from '@utils';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CourseItem from '../CourseItem';
import CustomPagination from '../CustomPagination';
import { getInitialGridState } from '../../helpers';

const CourseGrid = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const isMobileScreen = useMediaQuery('(max-width: 767px)');

  const { courses, setParams, isFetching, page } = useGetAllCourse();

  const currentState = getInitialGridState(query);

  const getActionParams = useCallback(
    (currentState: any) => {
      const itemsPerPage = currentState?.itemsPerPage;
      const page = currentState?.page;
      const searchText = currentState?.searchText;

      let orderParam = null;
      if (!isEmpty(currentState?.sortOrder?.name) && !isEmpty(currentState?.sortOrder?.direction)) {
        orderParam = `${currentState?.sortOrder?.name}:${currentState?.sortOrder?.direction}`;
      }

      const params = {
        page: page,
        perPage: itemsPerPage,
        sort: orderParam,
        searchText: searchText,
        rating: currentState?.rating,
        wordCount: currentState?.wordCount,
      };

      return params;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleGetCourseList = (params: TableParams) => {
    const { page, ...rest } = params;
    setParams({ ...rest, page: Number(page) + 1 });
  };

  const handleTriggerAction = () => {
    const params = getActionParams(currentState);
    handleGetCourseList(params);
  };

  useEffect(() => {
    handleTriggerAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (isFetching) {
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        justifyContent: 'center',
      }}
    >
      <Stack width="100%" justifyContent="space-between" padding="24px" gap={3}>
        {courses?.length > 0 ? (
          <>
            <Grid container columnSpacing={2} rowSpacing={4} spacing={1}>
              {courses.map((course) => (
                <Grid item xs={isMobileScreen ? 12 : 3} key={course.id}>
                  <CourseItem course={course} />
                </Grid>
              ))}
            </Grid>
            <CustomPagination
              count={page?.totalItems}
              page={Number(query.get(TableQueryParams._PAGE) || 0)}
              itemsPerPage={12}
            />
          </>
        ) : (
          <Stack alignItems={'center'} spacing={1}>
            <Image
              src={IMAGES.noResultsFound}
              style={{ width: '200px', height: '200px', alignSelf: 'center' }}
            />
            <Typography variant="body1" fontWeight={600}>
              Không tìm thấy kết quả
            </Typography>
            <Typography variant="body2">
              Chúng tôi không thể tìm thấy những gì bạn đang tìm kiếm...
            </Typography>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default CourseGrid;
