import Link from "next/link";
import Col from "react-bootstrap/Col";
import Contactdetails from "@data/footer.json";
import { Row } from "react-bootstrap";
import Image from "next/image";

export default function TestFooterRight() {
  return (
    <Col
      lg={{ span: 6, offset: 3 }}
      className="me-0 mt-4 text-center text-lg-end footer-links"
    >
      <div className="d-md-flex justify-content-evenly">
        <h5 className="mb-0 text-decoration-underline">
          <a
            href={Contactdetails.parentportal.link}
            target="_blank"
            rel="noopener noreferrer"
            className="footer nav-link mt-2"
          >
            <Image
              src={Contactdetails.parentportal.icon}
              alt={Contactdetails.parentportal.text}
              width={30}
              height={30}
              className="me-2"
            />
            {Contactdetails.parentportal.text}
          </a>
          {/* <div className="w-100 lines bg-asb-accent" /> */}
        </h5>
        <h5 className="mb-0 text-decoration-underline">
          <Link
            href={Contactdetails.careers.link}
            className="footer nav-link my-2 "
          >
            <Image
              src={Contactdetails.careers.icon}
              alt={Contactdetails.careers.text}
              width={30}
              height={30}
              className="me-2"
            />
            {Contactdetails.careers.text}
          </Link>
        </h5>
        <h5 className="mb-0 text-decoration-underline">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={Contactdetails.publicdisclosure.link}
            className="footer nav-link my-2"
          >
            <Image
              src={Contactdetails.publicdisclosure.icon}
              alt={Contactdetails.publicdisclosure.text}
              width={30}
              height={30}
              className="me-2"
            />
            {Contactdetails.publicdisclosure.text}
          </a>
        </h5>
      </div>
    </Col>
  );
}
