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
import RichTextBlock from "@display-items/rich-text-block";

export default function Discipline({ discipline }) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Discipline </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{discipline.title} </h2>
        <section className="my-5">
          <Container>
            <Col md={10} className="mb-5">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <h2 className="text-end">
                    <em>{discipline.subtitle}</em>
                  </h2>
                </blockquote> 
                <h2>
                  <figcaption className="text-end blockquote-footer">
                    <cite>{discipline.btnText}</cite>
                  </figcaption>
                </h2>
              </figure>
            </Col> 
            <Col md={10} className="mb-5 mx-auto">
              <RichTextBlock description={discipline.description} />
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
          discipline: content(id: "4bVhpNzhMeOp3K2Hj0Rbi5") {
            title
            subtitle
            btnText
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
  const discipline = data.discipline;

  return {
    props: {
      discipline,
    },
    revalidate: 60,
  };
}
