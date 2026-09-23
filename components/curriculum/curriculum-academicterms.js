import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DownloadButton from "@buttons/download-button";
import RichTextBlock from "@display-items/rich-text-block";

export default function CurriculumAcademicterms({
  title,
  subtitle,
  btnLink,
  btnIcon,
  btnText,
  description,
}) {
  return (
    <>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="fw-bold">{title}</Card.Title>
              <Card.Text>{subtitle}</Card.Text>
              <a href={btnLink} target="_blank" rel="noopener noreferrer">
                <DownloadButton btnicon={btnIcon}>{btnText}</DownloadButton>
              </a>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
                <RichTextBlock description={description} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
