import React, { useState } from "react";
import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Head from "next/head"; 
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import CustomToggle from "@buttons/custom-toggle";
import NewStudent from "@new-students/new-student";
import NewStudentUniform from "@new-students/new-student-uniform"; 

export default function NewStudents({
  uniform,
  transport,
  rulesandrecommendations,
  timings,
}) {
  const [activeEventKey, setActiveEventKey] = useState(0);
  return (
    <div>
      <Head>
        <title> The Asian School Bahrain | New Students </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">New Students</h2>
        <section className="my-5">
          <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          >
            <Card className="rounded-0">
              <Card.Header className="bg-asb-accent text-uppercase">
                <CustomToggle eventKey="0">Uniform</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <NewStudentUniform
                  title={uniform.title}
                  subtitle={uniform.subtitle}
                  btnText={uniform.btnText}
                  description2={uniform.description2}
                  description={uniform.description}
                  image={uniform.image}
                  imagesCollection={uniform.imagesCollection}
                />
              </Accordion.Collapse>
            </Card>

            <Card className="rounded-0">
              <Card.Header className="bg-asb-accent text-uppercase">
                <CustomToggle eventKey="1">{transport.title}</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <NewStudent
                  title={transport.title}
                  description={transport.description}
                />
              </Accordion.Collapse>
            </Card>

            <Card className="rounded-0">
              <Card.Header className="bg-asb-accent text-uppercase">
                <CustomToggle eventKey="2">
                  {rulesandrecommendations.title}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <NewStudent
                  title={rulesandrecommendations.title}
                  description={rulesandrecommendations.description}
                />
              </Accordion.Collapse>
            </Card>

            <Card className="rounded-0">
              <Card.Header className="bg-asb-accent text-uppercase">
                <CustomToggle eventKey="3">{timings.title}</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <NewStudent
                  title={timings.title}
                  description={timings.description}
                />
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
          uniform: content(id: "2onimXwuu6CtLcdnqODSpS") {
            ...newstudent
          }
          transport: content(id: "6pyYx2dtrDXerBLxZKBIoo") {
            ...newstudent
          }
          rulesandrecommendations: content(id: "6esNNoITqghW4GGrie7zUu") {
            ...newstudent
          }
          timings: content(id: "7pBeEKoJG4LiJSycxJ53DH") {
            ...newstudent
          }
        }
        fragment newstudent on Content {
          title
          subtitle
          btnText
          description2 {
            json
          }
          description {
            json
          }
          image {
            url
            width
            height
          }
          imagesCollection {
            items {
              url
              title
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
  const uniform = data.uniform;
  const transport = data.transport;
  const rulesandrecommendations = data.rulesandrecommendations;
  const timings = data.timings;

  return {
    props: {
      uniform,
      transport,
      rulesandrecommendations,
      timings,
    },
    revalidate: 60,
  };
}
