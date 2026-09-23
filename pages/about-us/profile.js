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
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import SchoolCrestMotto from "@profile/school-crest-motto";
import CustomToggle from "@buttons/custom-toggle";
import RichTextBlock from "@display-items/rich-text-block";

export default function Profile({
  About,
  SchoolCrest,
  VisionMission,
  SchoolSong,
}) {
  const [activeEventKey, setActiveEventKey] = useState(0);
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Profile </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <h2 className="page-title">{About.title}</h2>
      <section>
        <Container className="my-5">
          <Col md={10} lg={8} className="mx-auto">
            <RichTextBlock description={About.description} />
          </Col>
        </Container>
      </section>

      <section className="my-5">
        <Accordion
          activeeventkey={activeEventKey}
          onToggle={setActiveEventKey}
          alwaysOpen
        >
          <Card className="rounded-0">
            <Card.Header className="bg-asb-accent text-uppercase">
              <CustomToggle eventKey="0">{SchoolCrest.title}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <SchoolCrestMotto
                  image={SchoolCrest.image.url}
                  description={SchoolCrest.description}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className="rounded-0">
            <Card.Header className="bg-asb-accent rounded-0">
              <CustomToggle eventKey="1">{VisionMission.title}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Container className="py-5">
                  <Col md={10} className="mx-auto">
                    <RichTextBlock description={VisionMission.description} />
                  </Col>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card className="rounded-0">
            <Card.Header className="bg-asb-accent rounded-0">
              <CustomToggle eventKey="2">{SchoolSong.title}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Container className="py-5">
                  <Col md={10} className="mx-auto">
                    <div className="text-center">
                      <RichTextBlock description={SchoolSong.description} />
                    </div>
                  </Col>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
      <div className="p-3" />
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
          About: content(id: "7lOeOQSvBctAjpWqxNr4Z") {
            ...content
          }
          SchoolCrest: content(id: "1PCB4WUS2VlbXJBNtJZEmN") {
            ...content
          }
          VisionMission: content(id: "7305wiVAgUgyTDcYhZuWEO") {
            ...content
          }
          SchoolSong: content(id: "1Q98ssiX4VMBDCcRQAFUit") {
            ...content
          }
        }
        fragment content on Content {
          title
          image {
            url
          }
          description {
            json
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
  const About = data.About;
  const SchoolCrest = data.SchoolCrest;
  const VisionMission = data.VisionMission;
  const SchoolSong = data.SchoolSong;

  return {
    props: {
      About,
      SchoolCrest,
      VisionMission,
      SchoolSong,
    },
    revalidate: 60,
  };
}
