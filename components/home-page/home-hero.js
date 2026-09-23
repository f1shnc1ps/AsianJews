import Link from "next/link";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

export default function HomeHero({ image, title, btntext, link }) {
  return (
    <>
      <Image
        className="img-fluid home-hero-img"
        src={image}
        alt="ASB"
        width={1920}
        height={640}
        priority
      />
      <div className="hero-overlay"> </div>
      <Carousel.Caption>
        <h1 className="mb-3 text-center fw-bold">{title}</h1>
        {btntext ? (
          <Link href={link}>
            <Button
              variant="light"
              className="rounded-5 py-2 px-4 shadow text-asb-main text-uppercase fw-bold"
            >
              {btntext}
            </Button>
          </Link>
        ) : null}
      </Carousel.Caption>
    </>
  );
}
