import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import RichTextBlock from "@display-items/rich-text-block";

export default function Awards({ awards }) {
  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Awards </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{awards.title}</h2>
        <section className="my-5">
          <Container>
            <RichTextBlock description={awards.description} />
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
          awards: content(id: "20hr4JgImiS5yuMJEH5oDv") {
            title 
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
  const awards = data.awards;

  return {
    props: {
      awards,
    },
    revalidate: 60,
  };
}
