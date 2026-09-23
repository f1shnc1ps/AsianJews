import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdmissionSteps from "@admission-procedure/admission-steps";
import AdmissionChecklist from "@admission-procedure/admission-checklist";
import AdmissionParentPortal from "@admission-procedure/admission-parent-portal"; 
import RichTextBlock from "@display-items/rich-text-block";

export default function Procedure({
  KGG1Step1to3,
  KGG1Step3andUp,
  G2AboveStep1and2,
  G2AboveStep3andUp,
  KGGrade1Checklist,
  Grade2AboveChecklist,
  AuthTC,
}) { 
  return (
    <div>
      <Head>
        <title> The Asian School Bahrain | Admissions Procedure </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Admission Procedure</h2>
        <section className="my-5 ">
          <Container>
            <Tabs
              defaultActiveKey="kg-grade1"
              id="uncontrolled-tab-example"
              className="mx-auto"
              justify
            >
              <Tab
                eventKey="kg-grade1"
                title="KG & GRADE 1"
                className="homemenu "
              >
                <Row className="py-5 mx-0 bg-asb-accent">
                  <Col>
                    <div className="step-container">
                      <p className="fw-bold mb-4">
                        Before applying for admission, please make sure that ...
                      </p>

                      {KGGrade1Checklist.map((a, index) => (
                        <AdmissionChecklist
                          key={index}
                          description={a.description}
                        />
                      ))}
                    </div>
                    {KGG1Step1to3.map((a, index) => (
                      <AdmissionSteps
                        key={index}
                        steps={a.steps}
                        description={a.description}
                      />
                    ))}
                    <AdmissionParentPortal />
                    {KGG1Step3andUp.map((a, index) => (
                      <AdmissionSteps
                        key={index}
                        steps={a.steps}
                        description={a.description}
                      />
                    ))}
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="grade2andabove" title="GRADE 2 & ABOVE">
                <Row className="py-5 mx-0 bg-asb-accent">
                  <Col>
                    <div className="step-container">
                      <p className="fw-bold mb-4">
                        Before applying for admission, please make sure that ...
                      </p>
                      {Grade2AboveChecklist.map((a, index) => (
                        <AdmissionChecklist
                          key={index}
                          description={a.description}
                        />
                      ))}
                    </div>

                    {G2AboveStep1and2.map((a, index) => (
                      <AdmissionSteps
                        key={index}
                        steps={a.steps}
                        description={a.description}
                      />
                    ))}
                    <AdmissionParentPortal />
                    {G2AboveStep3andUp.map((a, index) => (
                      <AdmissionSteps
                        key={index}
                        steps={a.steps}
                        description={a.description}
                      />
                    ))}

                    <div className="step-container bg-light border border-asb-main">
                      <RichTextBlock
                        title={AuthTC.title}
                        description={AuthTC.description}
                      />
                    </div>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Container>
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
          KGG1Step1to3: admissionProcedureStepsCollection(
            where: { grades_contains_all: "KG and Grade 1" }
            limit: 3
            order: steps_ASC
          ) {
            ...admissionSteps
          }
          KGG1Step3andUp: admissionProcedureStepsCollection(
            where: { grades_contains_all: "KG and Grade 1" }
            order: steps_ASC
            skip: 3
          ) {
            ...admissionSteps
          }
          G2AboveStep1and2: admissionProcedureStepsCollection(
            where: { grades_contains_all: "Grade 2 and Above" } 
            limit: 2
            order: steps_ASC
          ) {
            ...admissionSteps
          }
          G2AboveStep3andUp: admissionProcedureStepsCollection(
            where: { grades_contains_all: "Grade 2 and Above" }
            order: steps_ASC
            skip: 2
          ) {
            ...admissionSteps
          }
          KGGrade1Checklist: admissionProcedureChecklistCollection(where: {title: "KG and Grade 1"} ) {
            ...checklistItems
          }
          Grade2AboveChecklist: admissionProcedureChecklistCollection(where: {title: "Grade 2 and Above"} ) {
            ...checklistItems
          }
          AuthTC: content(id: "3MdsZn4rkiUgTFg6PY8EBu") {
            title
            description {
              json
            }
          }
        }
        fragment admissionSteps on AdmissionProcedureStepsCollection {
          items {
            grades
            steps
            description {
              json
            }
          }
        }
        fragment checklistItems on AdmissionProcedureChecklistCollection {
          items{
            title
            checklistItem
            list
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
  const KGG1Step1to3 = data.KGG1Step1to3.items;
  const KGG1Step3andUp = data.KGG1Step3andUp.items;
  const G2AboveStep1and2 = data.G2AboveStep1and2.items;
  const G2AboveStep3andUp = data.G2AboveStep3andUp.items;
  const KGGrade1Checklist = data.KGGrade1Checklist.items;
  const Grade2AboveChecklist = data.Grade2AboveChecklist.items;
  const AuthTC = data.AuthTC;

  return {
    props: {
      KGG1Step1to3,
      KGG1Step3andUp,
      G2AboveStep1and2,
      G2AboveStep3andUp,
      KGGrade1Checklist,
      Grade2AboveChecklist,
      AuthTC,
    },
    revalidate: 60,
  };
}
