import Image from "next/image";
import { imgblurDataURL } from "../../lib/constants";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function GroupAchievers({ col, profilPicture, name, achievement }) {
  return (
    <>
      <Col md={col}>
        <Card className="border-0 mb-5 bg-asb-accent">
          <Card.Body>
            <div className="text-center">
              <Image
                className="img-fluid mb-0 p-1 "
                src={profilPicture} 
                placeholder="blur"
                blurDataURL={imgblurDataURL}
                width="600"
                height="400"
                alt={name}
              />
              <h6 className="text-start text-asb-secondary my-2 ms-2 ">{name}</h6>
              <h6 className="achievement text-center text-asb-secondary mb-0 fs-6">{achievement}</h6>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
 
