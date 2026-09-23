import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RoundIconButton from "@buttons/round-icon-button"; 
import Button from "react-bootstrap/Button";
import { Icon } from "@iconify/react";

export default function ConnectDisplay({ 
    connectText,
    googleMap,
    schoolAddressTitle, 
    schoolAddress1,
    schoolAddress2,
    schoolAddress3,
    mailingAddressTitle, 
    mailingAddress1,
    mailingAddress2,
    mailingAddress3,
    phone1Link,
    phone1Icon,
    phone1Text,
    phone2Link,
    phone2Icon,
    phone2Text,
    emailLink,
    emailIcon,
    emailText, 
    faxIcon,
    faxText, 
}) {
  return (
    <>
      <Container>
        <h4 className="text-center mb-5">{connectText}</h4>
        <Row className="my-5">
          <Col lg={6} md={12} className="order-2 order-lg-first">
            <iframe
              src={googleMap}
              style={{ border: 0 }}
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
          <Col lg={6} md={12} className="mx-auto">
            <Row>
              <Col md={6} sm={6} className="mb-3">
                <p className="mb-0 text-center">
                  <strong className="text-decoration-underline">
                    {schoolAddressTitle}
                  </strong> 
                  <br />
                  {schoolAddress1} <br />
                  {schoolAddress2} <br />
                  {schoolAddress3}
                </p>
              </Col>
              <Col md={6} sm={6} className="mb-3">
                <p className="mb-0 text-center">
                  <strong className="text-decoration-underline">
                    {mailingAddressTitle}
                  </strong>
                  <br />
                  {mailingAddress1} <br />
                  {mailingAddress2} <br />
                  {mailingAddress3}
                </p>
              </Col>
            </Row>

            <Row className="my-5">
              <Col className="d-flex justify-content-center mb-lg-3">
                <a href={phone1Link} className="text-center">
                  <RoundIconButton btnicon={phone1Icon} iconwidth={30}>
                    {phone1Text}
                  </RoundIconButton>
                </a>
              </Col>
              <Col className="d-flex justify-content-center mb-lg-3">
                <a href={phone2Link}>
                  <RoundIconButton btnicon={phone2Icon} iconwidth={30}>
                    {phone2Text}
                  </RoundIconButton>
                </a>
              </Col>
            </Row>

            <Row className="my-5">
              <Col className="d-flex justify-content-center mb-lg-3 text-lowercase">
                <a href={emailLink}>
                  <RoundIconButton btnicon={emailIcon} iconwidth={30}>
                    <h4 className="round-button-text text-lowercase">
                      {emailText}
                    </h4>
                  </RoundIconButton>
                </a>
              </Col>

              <Col className="d-flex justify-content-center mb-lg-3">
                <Button className="round-button-container disable text-center mx-auto bg-white">
                  <div className="round-button-icon-container disable shadow">
                    <Icon icon={faxIcon} width={30} />
                  </div>
                  <h4 className="round-button-text">{faxText}</h4>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
