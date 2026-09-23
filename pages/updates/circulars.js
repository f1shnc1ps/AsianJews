/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import { SITE_NAME, SITE_FAVICON, SITE_DESCRIPTION, imgblurDataURL, HOME_OG_IMAGE_URL } from "../../lib/constants";
import Head from "next/head";
import Link from "next/link";
import Container from "react-bootstrap/Container";  
import { useTable, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react"; 
import DateFormatter from "@display-items/date-formatter"; 

export default function Circulars({circularsCollection}) {
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => {
          return <DateFormatter dateString={value} />;
        },
      },
      {
        Header: "Update",
        accessor: "title",
      },
      {
        Header: "Download Circular",
        accessor: "url",
        Cell: ({ value }) => {
          return (
            <Link href={value.url}  target="_blank">
                <Icon icon="bi:download" /> Download 
            </Link>
          );
        },
      },
    ],
    []
  );
  const data = useMemo(() => circularsCollection, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow, 
  } = useTable(
    {
      columns,
      data,
    }, 
  );

  return (
    <div>
      <Head>
        <title> The Asian School Bahrain | Circulars </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Circulars</h2>
        <section className="my-5">
          <Container>
            <Col md={8} className="mx-auto">
              <Table
                striped
                hover
                {...getTableProps()}
                className="text-center mx-auto" 
              >
                <thead className="bg-asb-main text-white">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => ( 
                        <th
                          {...column.getHeaderProps( 
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <Icon
                                  icon="bi:sort-down"
                                  width={30}
                                  className="ms-2"
                                />
                              ) : (
                                <Icon
                                  icon="bi:sort-up"
                                  width={30}
                                  className="ms-2"
                                />
                              )
                            ) : (
                              ""
                            )}
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
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table> 
            </Col>
          </Container>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,

    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          circularsCollection(order: date_DESC ) {
            items {
              date
              title
              url {
                url
              }
            }
          }
        }`,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const circularsCollection = data.circularsCollection.items; 

  return {
    props: {
      circularsCollection, 
    },
    revalidate: 60,
  };
}