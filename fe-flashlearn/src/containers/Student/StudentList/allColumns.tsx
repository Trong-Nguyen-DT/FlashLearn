import { COLOR_CODE } from '@appConfig';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { StudentResponse, UserResponse } from '@queries';
import { Callback, tableBodyRender } from '@utils';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { FaRegTrashAlt } from 'react-icons/fa';

type ColumnProps = {
  handleDelete: Callback;
};

export const allColumns = ({ handleDelete }: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'user',
      label: 'Tên học viên',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: UserResponse) => tableBodyRender(value.name),
      },
    },
    {
      name: 'user',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: UserResponse) => tableBodyRender(value.email),
      },
    },
    {
      name: 'user',
      label: 'Số điện thoại',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: UserResponse) => tableBodyRender(value.phone),
      },
    },
    {
      name: 'experience',
      label: 'Tổng XP',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => tableBodyRender(value),
      },
    },
    {
      name: 'xp',
      label: 'Quá trình học',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => tableBodyRender(value),
      },
    },
    {
      name: '',
      label: '',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          _value: string,
          meta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: StudentResponse[] }),
        ) => {
          const { tableData, rowIndex } = meta;
          const rowData = (tableData as StudentResponse[])?.[rowIndex];
          return (
            <Stack flexDirection="row" justifyContent={'center'}>
              <Tooltip title="Delete" arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(rowData);
                  }}
                >
                  <FaRegTrashAlt color={COLOR_CODE.DANGER} size={20} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
      },
    },
  ];

  return columns;
};
