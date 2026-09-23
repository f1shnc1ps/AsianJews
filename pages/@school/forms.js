import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import React from "react";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FormsItem from "@display-items/forms-item";

export default function Forms({ formsCollection }) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Forms </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <h2 className="page-title">Forms</h2>
      <section className="my-5">
        <Container>
          <h5 className="text-center">
            Form should be downloaded and a hard copy with all details filled in
            should be submitted to the school office.
          </h5>
          <Row>
            {formsCollection.map((a, index) => (
              <FormsItem
                key={index}
                icon={a.icon}
                title={a.title}
                subtitle={a.subtitle}
                btnicon={a.btnicon}
                btntext={a.btntext}
                url={a.url}
                link={a.link}
              />
            ))}
          </Row>
        </Container>
      </section>
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
          formsCollection (order: weight_ASC){
            items {
              title
              subtitle
              icon
              btnicon
              btntext
              link
              url {
                title
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
  const formsCollection = data.formsCollection.items;

  return {
    props: {
      formsCollection,
    },
    revalidate: 60,
  };
}
