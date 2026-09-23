import { SITE_NAME, SITE_FAVICON, SITE_DESCRIPTION,  imgblurDataURL, HOME_OG_IMAGE_URL } from "../../lib/constants";
import React from "react";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import TimelineItem from "@display-items/timeline-item";

export default function History({historyCollection}) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain |  History </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>
      
      <main>
        <h2 className="page-title">History</h2>
        <section className="my-5 py-5">
          <Container>
            <Col md={12} lg={10} className="mx-auto">
              <div className="timeline">
                {historyCollection.map((a, index) => (
                  <TimelineItem
                    key={index}
                    leftRight={a.leftRight}
                    text={a.text}
                    year={a.year}
                    icon={a.icon}
                  />
                ))}
              </div>
            </Col>
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
          historyCollection(order: year_ASC) {
            items { 
              leftRight
              text
              year
              icon
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
  const historyCollection = data.historyCollection.items;

  return {
    props: {
      historyCollection,
    },
    revalidate: 60,
  };
}
