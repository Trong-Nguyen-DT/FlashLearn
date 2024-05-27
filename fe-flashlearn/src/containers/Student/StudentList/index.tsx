/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading, Table } from '@components';
import EmptyTable from '@components/Table/EmptyTable';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useGetStudents } from '@queries';
import { MUIDataTableOptions } from 'mui-datatables';
import { useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { allColumns } from './allColumns';

type Props = {
  isOwner: boolean;
};

const StudentList: React.FC<Props> = ({ isOwner }) => {
  const { courseId } = useParams<{ courseId: string }>();

  const { students, isFetching, page } = useGetStudents({ courseId });

  const handleAdd = () => {
    console.log('handleAdd');
  };

  const handleGetProductList = () => {};

  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: page?.totalItems,
      rowHover: page?.totalItems > 0,
      filter: false,
      search: false,
      pagination: false,
      customFooter: null,
    }),
    [page],
  );

  const columns = useMemo(() => allColumns({}), []);

  if (!isOwner) {
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3}>
        <Typography variant="body1" fontWeight={600}>
          Bạn không có quyền xem trang này
        </Typography>
      </Stack>
    );
  }

  if (isFetching) {
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack sx={{ mb: 2, mt: 6 }}>
        <Typography variant="h3" fontWeight={800}>
          Danh sách học viên
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="end" flexDirection="row">
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          <Button variant="contained" color="primary" startIcon={<IoAdd />} onClick={handleAdd}>
            Thêm học viên
          </Button>
        </Stack>
      </Stack>
      <Table
        title=""
        onAction={handleGetProductList}
        isLoading={isFetching}
        data={students}
        tableOptions={tableOptions}
        columns={columns}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default StudentList;
