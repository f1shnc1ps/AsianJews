import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; 
import RichTextBlock from "@display-items/rich-text-block";
 
export default function SchoolCrestMotto({ image, description }) {
  return (
    <>
      <Container className="py-5">
        <Col md={10} className="mx-auto">
          <Row>
            <Col md={4}>
              <div className="text-center">
                <Image
                  className="img-fluid"
                  src={image}
                  alt="ASB"
                  width="300"
                  height="300" 
                />
              </div>
            </Col>
            <Col md={8}>
              <RichTextBlock description={description}/> 
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
}
