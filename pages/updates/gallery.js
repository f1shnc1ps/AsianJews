import {
  SITE_NAME,
  SITE_FAVICON,
  SITE_DESCRIPTION,
  imgblurDataURL,
  HOME_OG_IMAGE_URL,
} from "../../lib/constants";
import React, { useState } from "react";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import ImageMosaic from "@lightbox-gallery/image-mosaic";
import ImageLightbox from "@lightbox-gallery/image-lightbox";
 
if (typeof window === "undefined") React.useLayoutEffect = () => {};

export default function Gallery({ galleryCollection }) {
  const [isOpen, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const images = galleryCollection;

  return (
    <>
      <Head>
        <title> The Asian School Bahrain | Gallery </title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href={SITE_FAVICON} />
      </Head>

      <h2 className="page-title">Gallery</h2>
      <section className="my-5">
        <Container>
          <div className="my-5">
            <ImageMosaic 
                images={images.map((image) => ({
                src: image.url.url,
                title: image.title,
                width: image.url.width,
                height: image.url.height,
              }))}
              handleClick={(e, { index }) => {
                setCurrentIndex(index);
                setOpen(true);
              }}
            />

            <ImageLightbox
              currentImageIndex={currentImageIndex}
              setCurrentIndex={setCurrentIndex}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              images={images.map((image) => ({
                src: image.url.url,
                title: image.title,
              }))}
            />
          </div>
        </Container>
      </section>
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
          galleryCollection(order: weight_ASC) {
            items {
              weight
              url {
                title
                url
                width
                height
              }
              title
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
  const galleryCollection = data.galleryCollection.items;

  return {
    props: {
      galleryCollection,
    },
    revalidate: 60,
  };
}
