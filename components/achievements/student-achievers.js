import { imgblurDataURL } from "../../lib/constants";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function StudentAchievers({ name, weight, rank, aggregate, achievement, profilPicture, }) {
  return (
    <>
      <Col md={3}>
        <Card className="border-0 mb-5 bg-asb-accent">
          <Card.Body>
            <div className="text-center">
            <h6 className="achievement text-center text-asb-secondary mb-0 fw-bold fs-6">{rank}</h6>
              <Image
                className="img-fluid mb-0 p-1 "
                src={profilPicture} 
                placeholder="blur"
                blurDataURL={imgblurDataURL}
                width="200"
                height="300"
                alt={name}
              />
              <p className="text-center text-uppercase text-asb-secondary mb-0 fw-bold">{name}</p>
              <h6 className="achievement text-center text-asb-secondary mb-0 fw-bold fs-6">{aggregate}</h6>
              <h6 className="achievement text-center text-asb-secondary mb-0 fs-6">{achievement}</h6>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}






