import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import FeesTypeItem from "@fees/fees-type-item";
import FeesTableItem from "@fees/fees-table-item"; 

export default function Fees({fees}) {
  return (
    <>
      <Head> 
        <title> The Asian School Bahrain | Fees </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{fees.title}</h2>

        <section className="my-5">
          <Container>
            <h5 className="text-center">{fees.subtitle}</h5>
            <Row className="text-center my-5">
              {fees.feestypes.map((a, index) => (
                <FeesTypeItem key={index} title={a.title} text={a.text} />
              ))}
            </Row>

            <Table size="sm" striped bordered hover responsive>
              <thead>
                <tr className="bg-asb-main text-white">
                  <th scope="col"> </th>
                  {fees.feestypes.map((a, index) => (
                    <th key={index} scope="col">
                      {a.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fees.feesamt.map((a, index) => (
                  <FeesTableItem
                    key={index}
                    title={a.title}
                    col1={a.col1}
                    col2={a.col2}
                    col3={a.col3}
                    col4={a.col4}
                  />
                ))}
              </tbody>
            </Table>
            
            <p className="text-center fs-6">
              <small>{fees.subtext1}</small> <br/>
              <small>{fees.subtext2}</small>
            </p>
          </Container>
        </section>

        <section className="py-5 bg-light">
          <Container>
            <h5>{fees.refundtitle}</h5>
            <p className="mb-0">{fees.refundtext}</p>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <h5>{fees.feeguidelines}</h5>
            <ul>
              {fees.feeguidelinesitems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
    </>
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
          fees(id: "2FkB1dww5noycfz2rW0KcJ") {
            title
            subtitle
            feestypes
            feesamt
            subtext1
            subtext2
            refundtitle
            refundtitle
            refundtext
            feeguidelines
            feeguidelinesitems
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
  const fees = data.fees;
  
  return {
    props: {
      fees,
    },
    revalidate: 60,
  };
}
