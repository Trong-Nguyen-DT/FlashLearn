import { COLOR_CODE } from '@appConfig';
import { NAVBAR_HEIGHT } from '@appConfig/constants';
import { PATHS } from '@appConfig/paths';
import {
  DialogContext,
  DialogType,
  FilterContainer,
  SearchBar,
  Select,
  TableQueryParams,
} from '@components';
import { Button, Stack, Typography } from '@mui/material';
import { IRootState } from '@redux/store';
import { isEmpty } from '@utils';
import { useCallback, useContext, useMemo, useState } from 'react';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { sortOptions } from '../../helpers';
import CourseFilter from '../CourseFilter';
import {
  COURSE_FILTER_QUERY_KEY,
  CourseFilterFormValue,
  filterParamsKey,
} from '../CourseFilter/helpers';

const CourseHeader = () => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const [selectedSortValue, setSelectedSortValue] = useState('');

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const navigate = useNavigate();

  const paramsUrl: CourseFilterFormValue = useMemo(() => {
    const ratingQuery = Number(query.get(COURSE_FILTER_QUERY_KEY.Rating)) || undefined;
    const wordCountQuery = query.get(COURSE_FILTER_QUERY_KEY.WordCount) || undefined;

    return {
      rating: ratingQuery,
      wordCount: wordCountQuery,
    };
  }, [query]);

  const setSortParam = useCallback((sortValue: string, query: URLSearchParams) => {
    if (!isEmpty(sortValue)) {
      query.set(TableQueryParams._SORT, sortValue);
    } else {
      query.delete(TableQueryParams._SORT);
    }
    return navigate({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestLogin = () => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: 'Bạn phải đăng nhập để tiếp tục',
      hideTitle: true,
      showIcon: true,
      isWarning: true,
      okText: 'Đăng nhập',
      cancelText: 'Hủy',
      onOk: () => {
        navigate(PATHS.signIn);
        closeModal();
      },
    });
    openModal();
  };

  const handleAddCourse = () => {
    navigate(PATHS.courseCreate);
  };

  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_CODE.PRIMARY_100,
        boxShadow: '0px 1px 10px 1px rgba(21, 96, 100, 0.1)',
        pt: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <Typography
        fontSize={60}
        fontWeight={900}
        textAlign={'center'}
        py={8}
        color={COLOR_CODE.PRIMARY}
      >
        Danh sách khóa học
      </Typography>
      <Stack direction={'row'} gap={2} justifyContent={'space-between'} width={'100%'} p={2}>
        <Stack direction={'row'} gap={2} px={3}>
          <SearchBar />
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              !isAuthenticated ? handleRequestLogin() : handleAddCourse();
            }}
          >
            Tạo khóa học
          </Button>
        </Stack>
        <Stack direction={'row'} gap={2} px={3}>
          <FilterContainer filterParamsKeys={filterParamsKey}>
            <CourseFilter searchValues={paramsUrl} />
          </FilterContainer>
          <Select
            onChange={(_name, value) => {
              setSelectedSortValue(value);
              setSortParam(value, query);
            }}
            options={sortOptions}
            value={selectedSortValue}
            placeholder="Sắp xếp"
            styles={{
              width: '290px',
            }}
            alignEnd
            icon={
              selectedSortValue?.includes('asc') ? (
                <TbSortAscending color={COLOR_CODE.PRIMARY_500} size="18px" />
              ) : selectedSortValue?.includes('desc') ? (
                <TbSortDescending color={COLOR_CODE.PRIMARY_500} size="18px" />
              ) : null
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseHeader;
