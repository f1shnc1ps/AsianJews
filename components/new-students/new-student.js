import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import RichTextBlock from "@display-items/rich-text-block";

export default function NewStudent({ title, description }) {
  return (
    <>
      <Card.Body>
        <Container fluid="md" className="p-1 p-md-2 px-lg-5 bg-asb-accent">
          <h3 className="page-title my-4">{title}</h3>
          <RichTextBlock description={description} />
        </Container>
      </Card.Body>
    </>
  );
}
