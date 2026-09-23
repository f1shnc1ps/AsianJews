/* eslint-disable react/jsx-key */ 
import { useTable, useSortBy, useGlobalFilter } from "react-table"; 
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react";
import GlobalFilter from "./global-filter"; 

export default function TransferOutTable({ columns, data }) {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
  },
  useGlobalFilter,
  useSortBy
  );

  const { globalFilter} = state

  return (
    <>
    <Col md={6} className="mx-auto"> 
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    </Col> 
      <Table size="sm" striped hover {...getTableProps()} className="table-responsive align-middle text-center mx-auto">
        <thead className="bg-asb-main text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? 
                  <Icon icon="bi:sort-down" width={30} className="ms-2"/> : <Icon icon="bi:sort-up" width={30} className="ms-2" />) : '' }
                </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      </>
  );
}