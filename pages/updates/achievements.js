import React from "react";
import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
  BASE_PATH,
} from "../../lib/constants";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentAchievers from "@achievements/student-achievers";
import GroupAchievers from "@achievements/group-achievers";
import { useRouter } from "next/router";

export default function Achievements({
  grade10toppers,
  grade1095AndAbove,
  grade10SubjectToppers,
  grade12toppers,
  grade12Humanities,
  grade12Commerce,
  grade12Science,
  grade12FullA1,
  grade12SubjectToppers,
  teamAchievementCollection,
}) {
  const router = useRouter();
  const canonicalSlug = router.asPath;

  return (
    <div>
      <Head>
        <title> The Asian School Bahrain | Achievements </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
        <link rel="canonical" href={`${BASE_PATH}${canonicalSlug}`} />
      </Head>

      <main>
        <h2 className="page-title">Achievements</h2>
        <section className="my-5 ">
          <Container>
            <Tabs
              defaultActiveKey="individual"
              id="uncontrolled-tab-example"
              className="mx-auto"
              justify
            >
              <Tab
                eventKey="individual"
                title="Individual"
                className="homemenu "
              >
                <Row className="py-5 mx-0 bg-asb-accent">
                  <h4 className="text-center my-3">SCHOOL TOPPERS 2023-2024</h4>

                  <h3 className="text-center text-uppercase my-3">Grade 12 </h3>

                  {grade12toppers.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">
                    Humanities Toppers
                  </h4>

                  {grade12Humanities.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">Commerce Toppers</h4>

                  {grade12Commerce.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">Science Toppers</h4>
                  {grade12Science.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">
                    STUDENTS WHO SECURED A POSITIONAL A1 GRADE IN ALL SUBJECTS
                  </h4>
                  {grade12FullA1.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">
                    Subject Toppers
                  </h4>
                  {grade12SubjectToppers.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}
			  
                  <h3 className="text-center text-uppercase my-3">GRADE 10</h3>

                  {grade10toppers.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">
                    STUDENTS WHO SCORED 95% AND ABOVE
                  </h4>

                  {grade1095AndAbove.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}

                  <h4 className="text-center text-uppercase my-3">
                    SUBJECT TOPPERS
                  </h4>
                  {grade10SubjectToppers.map((a, index) => (
                    <StudentAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      achievement={a.achievement}
                      weight={a.weight}
                      rank={a.rank}
                      aggregate={a.aggregate}
                    />
                  ))}
                </Row>
              </Tab>
              {/* **********************************Team****************************************** */}
              <Tab eventKey="team" title="Team">
                <Row className="py-5 mx-0 bg-asb-accent">
                  {teamAchievementCollection.map((a, index) => (
                    <GroupAchievers
                      key={index}
                      profilPicture={a.profilPicture.url}
                      name={a.name}
                      col={a.col}
                      achievement={a.achievement}
                    />
                  ))}
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
          grade12toppers: individualAchieversCollection(
            where: { category: "grade12toppers" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade12Humanities: individualAchieversCollection(
            where: { category: "grade12Humanities" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade12Commerce: individualAchieversCollection(
            where: { category: "grade12Commerce" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade12Science: individualAchieversCollection(
            where: { category: "grade12Science" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade12FullA1: individualAchieversCollection(
            where: { category: "grade12FullA1" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade12SubjectToppers: individualAchieversCollection(
            where: { category: "grade12SubjectToppers" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade10toppers: individualAchieversCollection(
            where: { category: "grade10toppers" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade1095AndAbove: individualAchieversCollection(
            where: { category: "grade1095AndAbove" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          grade10SubjectToppers: individualAchieversCollection(
            where: { category: "grade10SubjectToppers" }
            order: weight_ASC
          ) {
            ...topperFields
          }
          teamAchievementCollection {
            items {
              name
              col
              achievement
              profilPicture {
                title
                url
                width
                height
              }
            }
          }
        }
        fragment topperFields on IndividualAchieversCollection {
          items {
            category
            name
            weight
            rank
            aggregate
            achievement
            profilPicture {
              title
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
  const grade12toppers = data.grade12toppers.items;
  const grade12Humanities = data.grade12Humanities.items;
  const grade12Commerce = data.grade12Commerce.items;
  const grade12Science = data.grade12Science.items;
  const grade12FullA1 = data.grade12FullA1.items;
  const grade12SubjectToppers = data.grade12SubjectToppers.items;
  const grade10toppers = data.grade10toppers.items;
  const grade1095AndAbove = data.grade1095AndAbove.items;
  const grade10SubjectToppers = data.grade10SubjectToppers.items;
  const teamAchievementCollection = data.teamAchievementCollection.items;

  teamAchievementCollection;

  return {
    props: {
      grade12toppers,
	  grade12Humanities,
      grade12Commerce,
      grade12Science,
      grade12FullA1,
      grade12SubjectToppers,
      grade10toppers,
      grade1095AndAbove,
      grade10SubjectToppers,
      teamAchievementCollection,
    },
    revalidate: 60,
  };
}
