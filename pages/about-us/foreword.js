import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MessageDisplay from "@display-items/message-display";

export default function Foreword({ foreword }) {
  return (
    <>
      <Head>
        <title> Asian School Bahrain | Foreword </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{foreword.title}</h2>
        <section className="my-5">
          <Container>
            <Row className="my-5 bg-asb-accent py-5 p-md-5">
              <MessageDisplay
                title={foreword.title}
                image={foreword.image.url}
                subtitle={foreword.subtitle}
                description={foreword.description}
                btnText={foreword.btnText} 
              />
            </Row>
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
            foreword: content (id: "7vaq1MTb2aEujSj26zeAKH") {
            title
            subtitle
            btnText
            image {
              url
            }
            description {
              json
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
  const foreword = data.foreword;

  return {
    props: {
      foreword,
    },
    revalidate: 60,
  };
}

