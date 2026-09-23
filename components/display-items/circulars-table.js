/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import Link from "next/link";
import { useTable, useSortBy, useGlobalFilter } from "react-table"; 
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react"; 
import DateFormatter from "./date-formatter";
import DATA from "@data/circular.json";

export default function CircularsTable() {
  const columns = useMemo(() => 
  [
    {
      Header: "Date",
      accessor: "date", 
      Cell: ({value}) => {return  <DateFormatter dateString={value}/>}
    },
    {
      Header: "Update",
      accessor: "title"
    }, 
    {
      Header: "Download Circular",
      accessor: "URL",
      Cell: ({value})=> {return <Link href={value}  target="_blank"><Icon icon="bi:download" /> Download</Link>} 
    }
  ], []);
  const data = useMemo(() => DATA.circulars, []);
 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state, 
  } = useTable({
    columns,
    data,
  },
  useGlobalFilter,
  useSortBy
  ); 

  return (
    <>
    <Col md={6} className="mx-auto">  
    </Col> 
      <Table size="sm" striped hover {...getTableProps()} className="text-center mx-auto">
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