import { UserResponse } from '@queries';
import { tableBodyRender } from '@utils';
import { MUIDataTableColumn } from 'mui-datatables';

// eslint-disable-next-line @typescript-eslint/ban-types
type ColumnProps = {};

// eslint-disable-next-line no-empty-pattern
export const allColumns = ({}: ColumnProps): MUIDataTableColumn[] => {
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

    // {
    //   name: '',
    //   label: 'Actions',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     customBodyRender: (
    //       _value: string,
    //       meta:
    //         | MUIDataTableMeta
    //         | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: ProductResponse[] }),
    //     ) => {
    //       const { tableData, rowIndex } = meta;
    //       const rowData = tableData.at(rowIndex) as ProductResponse;
    //       return (
    //         <Stack flexDirection="row" justifyContent={'center'}>
    //           <Tooltip title="View" arrow placement="top">
    //             <IconButton
    //               onClick={(event) => {
    //                 event.stopPropagation();
    //                 handleView(rowData);
    //               }}
    //             >
    //               <IoEye color={COLOR_CODE.GREY_600} size={20} />
    //             </IconButton>
    //           </Tooltip>
    //           {RoleService.isAdminRole() && (
    //             <Tooltip title="Edit" arrow placement="top">
    //               <IconButton
    //                 onClick={(event) => {
    //                   event.stopPropagation();
    //                   handleEdit(rowData);
    //                 }}
    //               >
    //                 <IoPencil color={COLOR_CODE.GREY_600} size={20} />
    //               </IconButton>
    //             </Tooltip>
    //           )}
    //           {RoleService.isAdminRole() && (
    //             <Tooltip title="Delete" arrow placement="top">
    //               <IconButton
    //                 onClick={(event) => {
    //                   event.stopPropagation();
    //                   handleDelete(rowData);
    //                 }}
    //               >
    //                 <IoTrashBin color={COLOR_CODE.GREY_600} size={20} />
    //               </IconButton>
    //             </Tooltip>
    //           )}
    //         </Stack>
    //       );
    //     },
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
    //   },
    // },
  ];

  return columns;
};
