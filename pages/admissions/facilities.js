import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import React, { useState } from "react";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion"; 
import FacilitiesItem from "@facilities/facilities-item"; 
import FacilitiesAccordian from "@facilities/facilities-accordian";
import RichTextBlock from "@display-items/rich-text-block"; 

export default function Facilities({
  Classrooms,
  Halls,
  Labs,
  WellBeing,
  WellBeingTitle,
}) {
  const [activeEventKey, setActiveEventKey] = useState(0);

  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Facilities </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Facilities</h2>

        <section className="my-5">
          {Classrooms.map((a, index) => (
            <FacilitiesItem
              key={index}
              order={a.order}
              title={a.title}
              description={a.description}
              imagesCollection={a.imagesCollection}
            />
          ))}
        </section>

        <section className="my-5 py-5 bg-light">
          <h4 className="page-title">LABORATORIES</h4>
          {Labs.map((a, index) => (
            <FacilitiesItem
              key={index}
              order={a.order}
              title={a.title}
              description={a.description}
              imagesCollection={a.imagesCollection}
            />
          ))}
        </section>

        <section className="my-5 py-5">
          <h4 className="page-title">AUDITORIUMS AND HALLS</h4>
          {Halls.map((a, index) => (
            <FacilitiesItem
              key={index}
              order={a.order}
              title={a.title}
              description={a.description}
              imagesCollection={a.imagesCollection}
            />
          ))}
        </section>

        <section className="my-5 py-5 bg-light">
          <Container>
            <Col className="my-5">
              {WellBeingTitle.map((a, index) => (
                <div key={index}>
                  <h4 className="page-title">{a.title}</h4>
                  <RichTextBlock description={a.description} />
                </div>
              ))}
            </Col>
          </Container>

          <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          >
            {WellBeing.map((a, index) => (
              <FacilitiesAccordian
                key={index}
                weight={a.weight}
                eventKey={a.eventKey}
                title={a.title}
                description={a.description}
                imagesCollection={a.imagesCollection}
              />
            ))}
          </Accordion>
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
          Classrooms: facilitiesCollection(order: weight_ASC, limit: 3) {
            ...facilities
          }
          Labs: facilitiesCollection(order: weight_ASC, skip: 3, limit: 2) {
            ...facilities
          }
          Halls: facilitiesCollection(order: weight_ASC, skip: 5, limit: 2) {
            ...facilities
          }
          WellBeing: facilitiesWellBeingCollection (order: weight_ASC) {
            items{
              title
              weight
              eventKey
              description{
                json
              }
              imagesCollection{
                items{
                  url
                }
              }
            }
          }
          WellBeingTitle: contentCollection (where: {title: "WELL BEING"}) {
            items {
              title
              description {
                json
              }
            }
          }
        }
        fragment facilities on FacilitiesCollection {
          items {
            title
            order
            description {
              json
            }
            imagesCollection {
              items {
                url
              }
            }
          }
        }        
        `,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const Classrooms = data.Classrooms.items;
  const Labs = data.Labs.items;
  const Halls = data.Halls.items;
  const WellBeing = data.WellBeing.items;
  const WellBeingTitle = data.WellBeingTitle.items;

  return {
    props: {
      Classrooms,
      Labs,
      Halls,
      WellBeing,
      WellBeingTitle,
    },
    revalidate: 60,
  };
}
