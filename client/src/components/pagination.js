import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({
    count,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
}) => {
    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
};

export default Pagination;