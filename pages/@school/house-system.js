import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Head from "next/head"; 
import Container from "react-bootstrap/Container";
import HouseSystem from "../../components/display-items/house-system";

export default function HouseAndPrefectorialSystem({ housesystem }) {
  return (
    <>
      <Head> 
        <title> The Asian School Bahrain |  House and Prefectorial System </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">{housesystem.title}</h2>
        <section className="my-5">
          <Container>
            <div className="text-center mt-5"></div> 
              <HouseSystem 
                description={housesystem.description}
                image={housesystem.image.url}
                width={housesystem.image.width}
                height={housesystem.image.height}
              /> 
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
          housesystem: content(id: "5nUeGw8nHsF6yCh5x8sQjI") {
            title
            subtitle
            image {
              url
              width
              height
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
  const housesystem = data.housesystem;

  return {
    props: {
      housesystem,
    },
    revalidate: 60,
  };
}
