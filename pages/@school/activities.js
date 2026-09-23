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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import CompetionCard from "@activities/competition-card";
import ActivitiesAccordian from "@activities/activities-sports-accordian";
import ActivitiesItem from "@activities/activities";
import RichTextBlock from "@display-items/rich-text-block";

export default function Activities({ sportsintro, sports, activities, intra, inter }) {
  const [activeEventKey, setActiveEventKey] = useState(0);
  return (
    <>
      <Head>
        <title>The Asian School Bahrain | Activities</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{sportsintro.title}</h2>
        <section className="my-5">
          <Container>
            <RichTextBlock description={sportsintro.description}/>
          </Container>
         <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          > 
            {sports.map((a, index) => (
              <ActivitiesAccordian
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

        {activities.map((a, index) => (
          <ActivitiesItem
            key={index}
            background={a.background}
            order={a.order}
            title={a.title}
            description={a.description}
            imagesCollection={a.imagesCollection}
          />
        ))}

        <section className="my-5 py-5 bg-light">
          <Container>
            <Col className="my-5">
              <h4>COMPETITIONS</h4>
            </Col>

            <Tabs
              defaultActiveKey="intra-school-competions"
              id="uncontrolled-tab-example"
              className="mx-auto"
              justify
            >
              <Tab
                eventKey="intra-school-competions"
                title="intra school competions"
                className="homemenu"
              >
                <Row className="bg-asb-accent py-5 mx-0">
                  {intra.map((a, index) => (
                    <CompetionCard
                      key={index}
                      title={a.title}
                      description={a.description}
                      image={a.image.url}
                    />
                  ))}
                </Row>
              </Tab>

              <Tab
                eventKey="inter-school-competions"
                title="inter school competions"
                className="homemenu"
              >
                <Row className="bg-asb-accent py-5  mx-0">
                  {inter.map((a, index) => (
                    <CompetionCard
                      key={index}
                      title={a.title}
                      description={a.description}
                      image={a.image.url}
                    />
                  ))}
                </Row>
              </Tab>
            </Tabs>
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
          sportsintro: content(id: "627U8qsCXuNsxgqrCo76TM"){
            title
            description{
              json
            }
          }
          sports: activitiesSportsCollection(order: weight_ASC, limit: 8) {
            items {
              title
              weight
              eventKey
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
          activities: activitiesCollection(order: weight_ASC, limit: 10) {
            items {
              title
              weight
              order
              background
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
          inter: competitionsCollection(
            where: { type_contains_all: "inter" }
            order: weight_ASC
          ) {
            ...competition
          }
          intra: competitionsCollection(
            where: { type_contains_all: "intra" }
            order: weight_ASC
          ) {
            ...competition
          }
        }
        fragment competition on CompetitionsCollection {
          items {
            title
            type
            weight
            description {
              json
            }
            image {
              url
              width
              height
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
  const sportsintro = data.sportsintro;
  const sports = data.sports.items;
  const activities = data.activities.items;
  const intra = data.intra.items;
  const inter = data.inter.items;

  return {
    props: {
      sportsintro,
      sports,
      activities,
      intra,
      inter,
    },
    revalidate: 60,
  };
}
