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
import TopManagement from "@staff/top-management"; 
import AdminDirector from "@staff/admindirector";
import TopManagementThreeCol from "@staff/top-management-three-col";

export default function Management({
  managingDirector,
  director,
  admindirector,
}) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Management </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">Management</h2>
        <section className="my-5">
          <Container>
            <Col className="mx-auto">
              {managingDirector.map((a) => (
                <TopManagement
                  key={a.sys.id}
                  profilePicture={a.profilePicture.url}
                  role={a.role}
                  name={a.name}
                  description={a.description}
                />
              ))}
            </Col>
            
            <Row className="mx-auto">
              {director.map((a) => ( 
                <Col lg={6} xl={4} className="mx-auto" key={a.sys.id}>
                <TopManagementThreeCol 
                  profilePicture={a.profilePicture.url}
                  role={a.role}
                  name={a.name}
                  description={a.description}
                />
                </Col>
              ))}
            </Row> 
            <Col className="mx-auto">
              <Row>
                {admindirector.map((a) => (
                  <AdminDirector
                    key={a.sys.id}
                    profilePicture={a.profilePicture.url}
                    name={a.name}
                    role={a.role}
                  />
                ))}
              </Row>
            </Col>
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
          managingDirector: atTheHelmCollection(order: weight_ASC, limit: 1) {
            ...directors
          }
          director: atTheHelmCollection(order: weight_ASC, skip: 4, limit: 3) {
            ...directors
          }
          admindirector: atTheHelmCollection(order: weight_ASC, skip: 7, limit: 5) {
            ...directors
          }
        }
        fragment directors on AtTheHelmCollection {
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
  const managingDirector = data.managingDirector.items;
  const director = data.director.items;
  const admindirector = data.admindirector.items;

  return {
    props: {
      managingDirector,
      director,
      admindirector,
    },
    revalidate: 60,
  };
}
