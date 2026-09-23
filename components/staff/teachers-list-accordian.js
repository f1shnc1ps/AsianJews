import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import StaffList from "@staff/staff-list";
import CustomToggle from "@buttons/custom-toggle"

export default function TeachersListAccordian({
  weight,
  title,
  teachersList,
  tableHeaderName,
  tableHeaderQualification,
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
                <Col md={8} className="mx-auto">
                  <Table size="sm" striped hover responsive> 
                    <thead>
                      <tr className="bg-asb-main text-white">
                        {tableHeaderName ? (
                          <th>{tableHeaderName}</th>
                        ) : null}
                        {tableHeaderQualification ? (
                          <th>{tableHeaderQualification}</th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {teachersList.map((a, index) => (
                        <StaffList
                          key={index}
                          name={a.name}
                          qualification={a.qualification}
                        />
                      ))}
                    </tbody>
                  </Table>
                </Col> 
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
}
