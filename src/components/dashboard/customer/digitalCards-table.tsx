'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { Eye, IdentificationBadge, PencilSimple, Trash } from '@phosphor-icons/react';

import { useSelection } from '@/hooks/use-selection';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';


export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
}: any): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((digitalCard: any) => digitalCard.id);
  }, [rows]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const Router = useRouter();

  const handleChangePage = (event:any , newPage:any ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (id: any) => {
    console.log("View button clicked for ID:", id);
    Router.push(paths.dashboard.digitalCards + "/view?cardId=" + id);
  };
  
  const handleUpdate = (id: any) => {
    Router.push(paths.dashboard.digitalCards + "/update?caridId" + 1)
    console.log("Update button clicked for ID:", id);
    // Implement update logic here
  };
  
  const handleDelete = (id: any) => {
    console.log("Delete button clicked for ID:", id);
    // Implement delete confirmation and logic here
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Profile</TableCell>
              <TableCell>Card Name</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row: any) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Avatar src={row.profile_image_url} />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.card_name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.occupation}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {handleView(row.id)}} 
                      variant="contained" 
                      size="small"
                      sx={{backgroundColor: 'green'}}
                      startIcon={<Eye />}
                    >
                      View
                    </Button>
                    <Button 
                      onClick={() => handleUpdate(row.id)} 
                      variant="contained" 
                      size="small" 
                      sx={{backgroundColor: 'orange'}}
                      startIcon={<PencilSimple />}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Update
                    </Button>
                    <Button 
                      onClick={() => handleDelete(row.id)} 
                      variant="contained"
                      size="small"
                      sx={{backgroundColor: 'red'}}
                      startIcon={<Trash />}
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
