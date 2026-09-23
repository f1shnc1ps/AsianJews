import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewsletterItem from "@display-items/newsletter-item";

export default function Newsletter({ newsLetter }) {
  return (
    <div>
      <Head>
        <title> The Asian School Bahrain | School Newsletter </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <h2 className="page-title">School Newsletter</h2>
        <section className="my-5">
          <Container>
            <Col md={10} className="mx-auto">
              <p>
                The Campus News is the yearly newsletter of The Asian School. It
                has a distribution of over 5000 copies to parents, associated
                businesses, prominent personalities in Bahrain and India,
                friends and well-wishers.
              </p>
              <Row className="my-5">
                {newsLetter.map((a, index) => (
                  <Col md={4} key={index} className="text-center p-1 mb-5">
                    <NewsletterItem
                      title={a.title}
                      subtitle={a.subtitle}
                      URL={a.URL}
                      url={a.url}
                      link={a.link}
                      btnicon={a.btnicon}
                      btntext={a.btntext}
                    />
                  </Col>
                ))}
              </Row>
              <p className=" fw-light text-center text-muted">
                * If you would like to advertise in the Campus News, please
                contact Mr. Gigi Sebastian at the school office.
              </p>
            </Col>
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
          newsLetter: schoolNewsLetterCollection (order: weight_DESC){
            items {
              weight
              url {
                title
                url
                width
                height
              }
              title
              subtitle
              btnicon
              btntext
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
  const newsLetter = data.newsLetter.items;

  return {
    props: {
      newsLetter,
    },
    revalidate: 60,
  };
}
