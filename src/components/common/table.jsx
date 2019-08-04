import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
    const {columns, data, onSort, sortColumn} = props;
    return (
        <div>
            <table className="table">
                <TableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={data}
                    columns={columns}
                />
            </table>
        </div>
    );
};

export default Table;

