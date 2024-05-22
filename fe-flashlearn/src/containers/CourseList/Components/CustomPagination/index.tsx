import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination, Stack, Typography, useMediaQuery } from '@mui/material';
import { isEmpty } from '@utils';
import { TableQueryParams } from '@components';
import { COLOR_CODE } from '@appConfig';

const clsPrefix = 'custom-pagination';
const CustomPagination: React.FC<Props> = ({ count, page, itemsPerPage, recordName = 'items' }) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const isTabletScreen = useMediaQuery('(max-width: 840px)');

  const range = useMemo(() => {
    const end = (page + 1) * itemsPerPage;
    const start = end - (itemsPerPage - 1);
    if (count < end) return `${start}-${count}`;
    return `${start} - ${end}`;
  }, [count, page, itemsPerPage]);

  const handleChangePage = (_event: object, value: number) => {
    const selectedValue = value > 0 ? value - 1 : value;
    setPageParam(selectedValue, query);
  };

  const setPageParam = useCallback((newPage: number, query: URLSearchParams) => {
    if (!isEmpty(newPage)) {
      query.set(TableQueryParams._PAGE, newPage.toString());
    } else {
      query.delete(TableQueryParams._PAGE);
    }
    return navigate({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
      width="100%"
    >
      <Stack>
        {count ? (
          <Typography fontSize={14} className="fw-medium text-color-grey-600">
            Showing {range} of {count} {recordName}
          </Typography>
        ) : (
          <Stack />
        )}
      </Stack>
      <Stack
        {...(isTabletScreen && {
          justify: 'center',
        })}
        direction="row"
        pr={4}
      >
        <Pagination
          count={count > 0 ? Math.ceil(count / itemsPerPage) : 1}
          page={page + 1}
          shape="rounded"
          size="small"
          variant="outlined"
          onChange={handleChangePage}
          classes={{
            root: `${clsPrefix}-pagination`,
          }}
          sx={{
            button: {
              backgroundColor: COLOR_CODE.GREY_100,
              border: 'none',
              '&.Mui-selected': {
                color: COLOR_CODE.WHITE,
                backgroundColor: COLOR_CODE.PRIMARY,
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

type Props = {
  count: number;
  page: number;
  itemsPerPage: number;
  recordName?: string;
};

export default CustomPagination;
