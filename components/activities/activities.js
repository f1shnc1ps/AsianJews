import React from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import RichTextBlock from "@display-items/rich-text-block";

export default function ActivitiesItem({ background, order, title, description, imagesCollection }) {
  return (
    <>
      <section className={background}>
        <Container>
          <Row className="my-5">
            <Col md={6} className={order}>
              <h4>{title}</h4>
              <RichTextBlock description={description}/>
              {/* <p>{text}</p> */}
            </Col>
            <Col md={6}>
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
          </Row>
        </Container>
      </section>
    </>
  );
}
