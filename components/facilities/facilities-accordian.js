import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Carousel from "react-bootstrap/Carousel";
import CustomToggle from "@buttons/custom-toggle";
import RichTextBlock from "@display-items/rich-text-block";

export default function FacilitiesAccordian({
  weight,
  order,
  title,
  description,
  imagesCollection,
}) {
  return (
    <>
      <Card className="rounded-0">
        <Card.Header className="bg-asb-accent text-uppercase">
          <CustomToggle eventKey={weight}>{title}</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={weight}>
          <Card.Body>
            <Container className="py-5">
              <Row>
                <Col md={6} className="p-5">
                  <Carousel fade indicators={false}>
                    {imagesCollection?.items.map((item, index) => (
                      <Carousel.Item key={index}>
                        <div className="text-center">
                          <Image
                            className="img-fluid"
                            src={item.url}
                            alt="test"
                            width={600}
                            height={400}
                          />
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
                <Col md={6} className="my-5">
                  <RichTextBlock description={description} />
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
}
