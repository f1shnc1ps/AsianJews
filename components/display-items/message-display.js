import Image from "next/image"; 
import Col from "react-bootstrap/Col"; 
import RichTextBlock from "./rich-text-block"; 

export default function MessageDisplay({
  title,
  subtitle,
  image,
  description,
  btnText,
}) {
  return (
    <>
      <Col md={4} className="mx-auto">
        <Image
          className="img-fluid mb-3"
          src={image}
          alt="test"
          width={360}
          height={240}
        />
      </Col>

      <Col md={8} className="mx-auto">
        {subtitle ? (
          <>
            <blockquote className="blockquote">
              <h6 className="lead">{subtitle}</h6>
            </blockquote>
            <figcaption className="blockquote-footer text-end mb-5">
              <cite title="Source Title">{btnText}</cite>
            </figcaption>
          </>
        ) : null}
        <RichTextBlock description={description} />
      </Col>
    </>
  );
}
