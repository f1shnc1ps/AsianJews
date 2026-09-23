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

export default function Message({ message }) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Message </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{message.title}</h2>
        <section className="my-5">
          <Container>
            <Row className="my-5 bg-asb-accent py-5 p-md-5">
              <MessageDisplay 
                title={message.title}
                image={message.image.url}
                subtitle={message.subtitle}
                description={message.description} 
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
          message: content(id: "4ZudSeOusRlVO4MS0I22XW") {
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
  const message = data.message;

  return {
    props: {
      message,
    },
    revalidate: 60,
  };
}
