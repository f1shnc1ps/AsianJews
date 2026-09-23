import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../lib/constants"; 
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"; 
import RichTextBlock from "@display-items/rich-text-block";

export default function Careers({ careers }) {
  return (
    <>
      <Head>
        <title>The Asian School Bahrain | Careers</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>
      <main>
        <h2 className="page-title">{careers.title}</h2> 
        <section>
          <Container className="mb-5 py-5">
            <Col md={10} lg={8} className="mx-auto">
              <div className="text-center">
                <RichTextBlock description={careers.description} />
              </div>
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
        query: `query{
          careers: content(id: "39hTevo9PI5x3LTJcLH8UD"){
            title
            description{
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
  const careers = data.careers;

  return {
    props: {
      careers,
    },
    revalidate: 60,
  };
}
