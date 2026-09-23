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
import Accordion from "react-bootstrap/Accordion";
import CurriculumAcademicterms from "@curriculum/curriculum-academicterms";
import CurriculumItemsAccordian from "@curriculum/curriculum-items-accordian";
import CurriculumAssessmentAccordian from "@curriculum/curriculum-assessment-accordian";
// import PromotionCriteria from "@curriculum/promotion-criteria";
// import CoScholasticAssessment from "@curriculum/co-scholastic-assessment ";
import RichTextBlock from "@display-items/rich-text-block";

export default function Curriculum({
  academicterms,
  curriculumItems,
  curriculumAssementCollection,
  promotionCriteria,
  coScholasticAssessment,
}) {
  const [activeEventKey, setActiveEventKey] = useState(0);
  return (
    <>
      <Head> 
        <title> The Asian School Bahrain | Curriculum </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Curriculum</h2>
        <section className="my-5">
          <Container>
            <CurriculumAcademicterms 
              title={academicterms.title}
              subtitle={academicterms.subtitle}
              btnLink={academicterms.btnLink}
              btnIcon={academicterms.btnIcon}
              btnText={academicterms.btnText}
              description={academicterms.description}
            />
          </Container>
        </section>

        <section className="py-5">
          <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          >
            {curriculumItems.map((a, index) => (
              <CurriculumItemsAccordian
                key={index}
                weight={a.weight}
                title={a.title}
                description={a.description}
                syllabus={a.syllabus.url}
              />
            ))}
          </Accordion>
        </section>

        <section className="py-5 bg-asb-accent">
          <Container className="my-5">
            <h3 className="fw-bold mb-3">Evalution Criteria</h3>
            <h4 className="fw-bold">Scholastic Assessment</h4>
          </Container>
          <Accordion
            activeeventkey={activeEventKey}
            onToggle={setActiveEventKey}
            alwaysOpen
          >
            {curriculumAssementCollection.map((a, index) => (
              <CurriculumAssessmentAccordian
                key={index}
                weight={a.weight}
                title={a.title}
                url={a.url.url}
              />
            ))}
          </Accordion>

          <Container className="mt-5">
            {/* <CoScholasticAssessment /> */}
            <h4 className="fw-bold">{coScholasticAssessment.title}</h4>
            <RichTextBlock description={coScholasticAssessment.description}/>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            {/* <PromotionCriteria /> */}
            <h4 className="fw-bold mt-5 mb-3">{promotionCriteria.title}</h4>
            <RichTextBlock description={promotionCriteria.description}/>
            <h4 className="fw-bold mt-5 mb-3">{promotionCriteria.subtitle}</h4>
            <RichTextBlock description={promotionCriteria.description2}/>
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
          academicterms: content(id: "2SpRM0gDpbzcgWQbWj810u") {
            title
            subtitle
            btnText
            btnLink
            btnIcon
            description {
              json
            }
          }
          curriculumCollection(order: weight_ASC, limit: 5) {
            items {
              sys {
                id
              }
              weight
              title
              syllabus{
                url
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
          curriculumAssementCollection(order: weight_ASC) {
            items {
              weight
              url {
                url
                title
              }
              title
            }
          }
          promotionCriteria: content (id: "2KvRQnp6OiL7quah1E2rOc"){
            title
            subtitle
            description{
              json
            }
            description2{
              json
            }
          }
          coScholasticAssessment: content (id: "5stbwqkX8Q1aN80JPvEy4o"){
            title
            description{
              json
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
  const academicterms = data.academicterms;
  const curriculumItems = data.curriculumCollection.items;
  const curriculumAssementCollection = data.curriculumAssementCollection.items;
  const coScholasticAssessment = data.coScholasticAssessment;
  const promotionCriteria = data.promotionCriteria;
 
  return {
    props: {
      academicterms,
      curriculumItems,
      curriculumAssementCollection,
      promotionCriteria,
      coScholasticAssessment,
    },
    revalidate: 60,
  };
}
