import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import CustomToggle from "../buttons/custom-toggle";
import RichTextBlock from "@display-items/rich-text-block";

export default function CurriculumItemsAccordian({
  weight,
  title,
  description,
  syllabus,
}) {
  return (
    <>
      <Card className="rounded-0">
        <Card.Header className="bg-asb-accent text-uppercase">
          <CustomToggle eventKey={weight}>{title}</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={weight}>
          <Card.Body>
            <Container className="py-5 curriculum-container">
              <RichTextBlock description={description} />
              <div className="col-md-8 mt-5 ">
                For a complete perusal of the {title} school syllabus and a look at the monthly schedule of how the syllabus will be taught over the year, please <a href={syllabus} target="_blank" rel="noopener noreferrer"><b>Click Here</b></a> 
                </div>  
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
}
