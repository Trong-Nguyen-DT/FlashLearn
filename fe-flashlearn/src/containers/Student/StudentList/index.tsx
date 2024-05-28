/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogContext, DialogType, Loading, Table } from '@components';
import EmptyTable from '@components/Table/EmptyTable';
import { Button, Container, Stack, Typography } from '@mui/material';
import { StudentResponse, useGetStudents, useRemoveStudent } from '@queries';
import { MUIDataTableOptions } from 'mui-datatables';
import { useContext, useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { allColumns } from './allColumns';
import { COLOR_CODE } from '@appConfig';
import AddStudentModal from '../AddStudentModal';
import { Toastify } from '@services';

const StudentList = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { students, isFetching, page, handleInvalidateStudentList } = useGetStudents({ courseId });

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const { onDeleteStudent } = useRemoveStudent({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      Toastify.error(error.message?.[0]?.errorMessage);
    },
    onSuccess() {
      Toastify.success('Xóa học viên thành công');
      handleInvalidateStudentList();
      closeModal();
    },
  });

  const handleAdd = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      data: <AddStudentModal courseId={courseId} />,
      hideTitle: true,
      maxWidth: 'md',
    });
    openModal();
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

  const handleDelete = (row: StudentResponse) => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      contentText: 'Bạn có chắc muốn xóa học viên này ra khỏi lóp học?',
      hideTitle: true,
      showIcon: true,
      isWarning: true,
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        onDeleteStudent({ courseId, studentId: row.id });
        closeModal();
      },
    });
    openModal();
  };

  const columns = useMemo(() => allColumns({ handleDelete }), []);

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
        <Typography variant="h3" fontWeight={800} fontSize={24}>
          Danh sách học viên
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="end" flexDirection="row">
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoAdd />}
            onClick={handleAdd}
            sx={{
              width: 200,
              fontWeight: 800,
              boxShadow: `4px 4px 0px ${COLOR_CODE.PRIMARY_600}`,
              '&:hover': { boxShadow: `3px 3px 0px ${COLOR_CODE.PRIMARY_600}` },
            }}
          >
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
        emptyComponent={<EmptyTable title="Chưa có học sinh nào trong khóa học này." />}
      />
    </Container>
  );
};

export default StudentList;
