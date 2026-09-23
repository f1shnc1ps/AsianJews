import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../../lib/constants";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DateFormatter from "@display-items/date-formatter";
import SmallRoundIconButton from "@buttons/small-round-icon-button";
import EventsImageMosaic from "@events/events-image-mosaic";
import EventsImageLightbox from "@events/events-image-lightbox";
 
if (typeof window === "undefined") React.useLayoutEffect = () => {};

export default function EventPage({ event }) {
  const [isOpen, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const images = event.imagesCollection.items; 
  return (
    <>
      <Head>
        <title>
          The Asian School Bahrain |
           {/* {event.title} */}
        </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <main>
        <section className="my-5">
          <Container>
            <Row>
              <div className="d-flex justify-content-center">
                <div className="flex-grow-1">
                  <h4 className="text-center"> {event.title} </h4>
                  <div className="text-center">
                    <DateFormatter dateString={event.date} />
                  </div>
                </div>
                <div >
                  <Link href="/updates/events"  className=" me-3">
                      <SmallRoundIconButton btnicon="material-symbols:arrow-back">
                        Back
                      </SmallRoundIconButton> 
                  </Link>
                </div>
              </div>

              <div className="text-center mt-2">
                <Image
                  className="img-fluid w-auto h-auto"
                  src={event.featuredImage.url}
                  alt={event.title}
                  width={720}
                  height={480}
                />
                <p className="text-center text-asb-main mt-1">
                  {event.featuredImage.description}
                </p>
              </div>
              <div className="p-3">
                {documentToReactComponents(event.description.json)}
              </div>

              <div className="my-5">
                <EventsImageMosaic
                  images={images.map((image) => ({
                    src: image.url,
                    title: image.title,
                    width: image.width,
                    height: image.height,
                  }))}
                  handleClick={(e, { index }) => {
                    setCurrentIndex(index);
                    setOpen(true);
                  }}
                />

                <EventsImageLightbox
                  currentImageIndex={currentImageIndex}
                  setCurrentIndex={setCurrentIndex}
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                  images={images.map((image) => ({
                    src: image.url,
                    title: image.title,
                    // width: image.width,
                    // height: image.height,
                  }))}
                />
              </div>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { event } = params;

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
          query GetEvent($slug: String!) {
            eventCollection(
              where: {
                slug: $slug
              },
              limit: 1
            ) {
              items {
                sys{
                  id
                }
                title
                slug 
                date
                excerpt
                description{
                  json
                  links{
                    assets{
                      block{
                        sys{
                          id
                        }
                        url
                        description
                      }
                    }
                  }
                }
                featuredImage {
                  url
                  title
                  description
                }
                imagesCollection {
                  items {
                    sys {
                      id
                    }
                    url
                    title
                    description
                    width
                    height
                  }
                }
              }
            }
          }`,
        variables: {
          slug: event,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();
  const [eventData] = data.eventCollection.items;

  return {
    props: { event: eventData },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
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
            eventCollection {
              items {
                slug
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
  const eventSlugs = data.eventCollection.items;

  const paths = eventSlugs.map(({ slug }) => {
    return {
      params: { event: slug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
