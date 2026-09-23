import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react";
import Contactdetails from "@data/footer.json";


export default function TestFooterLeft() {
  return (
    <Col
      md={12}
      lg={{ span: 10, offset: 1 }}
      xl={{ span: 8, offset: 2 }}
      className="me-0 mt-5 text-center"
    >
      <Row>
        <h5 className="fw-bold">{Contactdetails.schooladdress.school}</h5>
        <p className="mb-0">
          <Icon
            icon={Contactdetails.schooladdress.icon}
            className="my-auto me-2 pb-1"
          />
          {Contactdetails.schooladdress.add1}{" "}
          {Contactdetails.schooladdress.add2}{" "}<br className="d-block d-sm-none"/>
          {Contactdetails.schooladdress.add3}
        </p>
        <Col md={12} lg={12}>
          <ul className="footer-contact d-md-flex justify-content-evenly">
            <li className="my-2 mx-1 mx-lg-2">
              <p>
                <a href={Contactdetails.phone1.link}>
                  <Icon
                    icon={Contactdetails.phone1.icon}
                    className="my-auto me-2 pb-1"
                  />
                  {Contactdetails.phone1.text}
                </a>
              </p>
            </li>
            <li className="my-2 mx-1 mx-lg-2">
              <p>
                <a href={Contactdetails.phone2.link}>
                  <Icon
                    icon={Contactdetails.phone2.icon}
                    className="my-auto me-2 pb-1"
                  />
                  {Contactdetails.phone2.text}
                </a>
              </p>
            </li> 
            <li className="my-2 mx-1 mx-lg-2">
              <p>
                <Icon
                  icon={Contactdetails.fax.icon}
                  className="my-auto me-2 pb-1"
                />
                {Contactdetails.fax.text}
              </p>
            </li>
            <li className="my-2 mx-1 mx-lg-2">
              <p>
                <a href={Contactdetails.email.link}>
                  <Icon
                    icon={Contactdetails.email.icon}
                    className="my-auto me-2 pb-1"
                  />
                  {Contactdetails.email.text}
                </a>
              </p>
            </li>
          </ul>
        </Col>
      </Row>
    </Col>
  );
}
