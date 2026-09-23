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
import Accordion from "react-bootstrap/Accordion";
import FacilitatorsItem from "@staff/facilitators";
import TeachersListAccordian from "@staff/teachers-list-accordian";
import TopManagement from "@staff/top-management";
import TopManagementTwoCol from "@staff/top-management-two-col";

export default function FacilitatorsTest({
  facilitatorsCollectionItem,
  teachersCollection,
  administrationCollection,
  principal,
  viceprincipal,
}) {
  const [activeEventKey, setActiveEventKey] = useState(0);

  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Facilitators </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Facilitators</h2>
        <h4 className="text-center mb-1">LEADERSHIP TEAM</h4>

        <section className="my-5">
          <Container>
            <Row>
              {principal.map((a) => (
                <Col className="mx-auto">
                  <TopManagement
                    key={a.sys.id}
                    profilePicture={a.profilePicture.url}
                    role={a.role}
                    name={a.name}
                    description={a.description}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              {viceprincipal.map((a) => (
                <Col lg={6} className="mx-auto" key={a.sys.id}>
                  <TopManagementTwoCol
                    profilePicture={a.profilePicture.url}
                    role={a.role}
                    name={a.name}
                    description={a.description}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="my-5">
          <Container>
            <Col md={10} className="mx-auto">
              <Row>
                {facilitatorsCollectionItem.map((a, index) => (
                  <FacilitatorsItem
                    key={index}
                    profilPicture={a.profilPicture.url}
                    role={a.role}
                    name={a.name}
                    qualifications={a.qualifications}
                  />
                ))}
              </Row>
            </Col>
          </Container>
        </section>

        <section className="my-5">
          <h4 className="text-center my-5">TEACHERS</h4>

          <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          >
            {teachersCollection.map((a, index) => (
              <TeachersListAccordian
                key={index}
                weight={a.weight}
                title={a.title}
                tableHeaderName={a.tableHeaderName}
                tableHeaderQualification={a.tableHeaderQualification}
                teachersList={a.teachersList}
              />
            ))}
          </Accordion>

          <h4 className="text-center my-5">ADMINISTRATION</h4>

          <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          >
            {administrationCollection.map((a, index) => (
              <TeachersListAccordian
                key={index}
                weight={a.weight}
                title={a.title}
                tableHeaderName={a.tableHeaderName}
                tableHeaderQualification={a.tableHeaderQualification}
                teachersList={a.teachersList}
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
          principal: atTheHelmCollection(order: weight_ASC, limit: 1, skip: 1) {
            ...management
          }
          viceprincipal: atTheHelmCollection(order: weight_ASC, limit: 2, skip: 2) {
            ...management
          }
          facilitatorsCollection(order: weight_ASC) {
            ...facilitators
          }
          teachersCollection(order: weight_ASC) {
            ...teachers
          }
          administrationCollection(order: weight_ASC) {
            ...administration
          }
        }
        fragment management on AtTheHelmCollection {
          items {
            sys {
              id
            }
            weight
            name
            role
            profilePicture {
              url
              title
              description
            }
            description {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    description
                  }
                }
              }
            }
          }
        }
        fragment facilitators on FacilitatorsCollection {
          items {
            sys {
              id
            }
            weight
            name
            role
            qualifications
            profilPicture {
              url
              title
              description
            }
          }
        }
        fragment teachers on TeachersCollection {
          items {
            title
            weight
            tableHeaderName
            tableHeaderQualification
            teachersList
          }
        }
        fragment administration on AdministrationCollection {
          items {
            title
            weight
            tableHeaderName
            tableHeaderQualification
            teachersList
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
  const principal = data.principal.items;
  const viceprincipal = data.viceprincipal.items;
  const facilitatorsCollectionItem = data.facilitatorsCollection.items;
  const teachersCollection = data.teachersCollection.items;
  const administrationCollection = data.administrationCollection.items;

  return {
    props: {
      principal,
      viceprincipal,
      facilitatorsCollectionItem,
      teachersCollection,
      administrationCollection,
    },
    revalidate: 60,
  };
}
