import { SITE_NAME, SITE_FAVICON, SITE_DESCRIPTION,  imgblurDataURL, HOME_OG_IMAGE_URL } from "../../lib/constants";
import Head from "next/head";
import Container from "react-bootstrap/Container";

export default function Calendar({ calendar }) {
  return (
    <div>
      <Head>
        <title> The Asian School Bahrain | School Calendar </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
      <h2 className="page-title">{calendar.title}</h2> 
        <section className="my-5">
          <Container>
            <iframe
              src={calendar.url}
              style={{ borderWidth: "0" }}
              width="100%"
              height="800"
            ></iframe> 
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
          calendar: content(id: "2NFjmpOlDgPSyHApe6Jfvj") {
            title
            url
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
  const calendar = data.calendar;

  return {
    props: {
      calendar,
    },
    revalidate: 60,
  };
}
