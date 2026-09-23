import Image from "next/image";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ImageMosaic from "@lightbox-gallery/image-mosaic";
import ImageLightbox from "@lightbox-gallery/image-lightbox";
import RichTextBlock from "@display-items/rich-text-block";

export default function NewStudentUniform({
  title,
  subtitle,
  btnText,
  description2,
  description,
  image,
  imagesCollection,
}) {
  const [isOpen, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const images = imagesCollection.items;

  return (
    <>
      <Card.Body>
        <Container fluid="md" className="p-1 p-md-2 px-lg-5 bg-asb-accent">
          <h3 className="page-title my-4">{title}</h3>
          <RichTextBlock description={description2} />
          <h5 className="mt-5">{btnText}</h5>
          <div className="my-3 mx-auto">
            <ImageMosaic
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
            <ImageLightbox
              currentImageIndex={currentImageIndex}
              setCurrentIndex={setCurrentIndex}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              images={images}
            />
          </div>
          <h4 className="fw-bold mt-5 mb-3">{subtitle}</h4>
          <Image
            className="img-fluid my-4"
            src={image.url}
            alt="uniform"
            width={600}
            height={400}
          />
          <RichTextBlock description={description} />
        </Container>
      </Card.Body>
    </>
  );
}
