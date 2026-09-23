import { SITE_NAME, SITE_FAVICON, SITE_DESCRIPTION,  imgblurDataURL, HOME_OG_IMAGE_URL } from "../../lib/constants";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card"; 

export default function UsefulResources({usefulResourcesListCareerCollection, usefulResourcesListResourcesCollection}) {
  return (
    <>
      <Head> 
        <title> The Asian School Bahrain |  Useful Resources </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>
      
      <main>
        <h2 className="page-title">Useful Resources</h2>

        <section className="my-5">
          <Container>
            <Row>
              {usefulResourcesListCareerCollection.map((a, index) => (
                <Col lg={6} md={6} key={index}>
                  <Link href={a.pdf.url} 
                      className="resource-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card className="text-center border-0 my-5">
                        <div className="text-center">
                          <Image
                            src={a.image.url}
                            alt={a.title}
                            width={150}
                            height={150}
                          />
                        </div>
                        <Card.Body>
                          <Card.Title className="mb-3">
                            <h5 className="resource-title">
                              <strong>{a.title}</strong>
                            </h5>
                          </Card.Title>
                        </Card.Body>
                      </Card> 
                  </Link>
                </Col>
              ))}
            </Row>
            <Row>
              {usefulResourcesListResourcesCollection.map((a, index) => (
                <Col lg={3} md={6} key={index}> 
                    <a
                      className="resource-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={a.link}
                    >
                      <Card className="text-center border-0 my-5">
                        <div className="text-center">
                          <Image
                            src={a.image.url}
                            alt={a.title}
                            width={150}
                            height={150}
                          />
                        </div>
                        <Card.Body>
                          <Card.Title className="mb-3">
                            <h5 className="resource-title">
                              <strong>{a.title}</strong>
                            </h5>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </a> 
                </Col>
              ))}
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
        query: `
        query {
          usefulResourcesListCareerCollection (order: weight_ASC) {
            items {
              weight
              title
              image {
                url
                width
                height
              }
              pdf {
                url
              }
            }
          }
          usefulResourcesListResourcesCollection (order: weight_ASC) {
            items {
              weight
              title
              image {
                url
                width
                height
              }
              link
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
  const usefulResourcesListCareerCollection = data.usefulResourcesListCareerCollection.items;
  const usefulResourcesListResourcesCollection = data.usefulResourcesListResourcesCollection.items;

  return {
    props: {
      usefulResourcesListCareerCollection,
      usefulResourcesListResourcesCollection,
    },
    revalidate: 60,
  };
}
