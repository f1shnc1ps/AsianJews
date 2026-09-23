import Link from "next/link";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Icon } from "@iconify/react";
import DownloadButton from "@buttons/download-button";
import RoundIconButton from "@buttons/round-icon-button";

export default function AdmissionParentPortal() {
  return (
    <>
      <div className="bg-white border border-asb-main step-container">
        <Row className="my-1">
          <Col md={6} className="text-center my-3">
            <strong>For new students with siblings at ASB</strong>

            <h6 className="fw-light text-start mb-4">
              If you have a child currently studying at The Asian School, Please
              read the instructional document AND LOGIN to the Parent Portal
            </h6>
            <Link
              href="/pdf/admission-instructions/Online-Application-Process-for-Sibling-Admissions.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadButton btnicon="">
                <h6 className="fw-6 mb-0">
                  <Icon
                    icon="material-symbols:download-rounded"
                    width={24}
                    className="me-3"
                  />
                  Instructional document (Sibling admission)
                </h6>
              </DownloadButton>
            </Link>

            <div className="mx-auto my-3 text-center">
              <a
                href="https://asbdc.ethdigitalcampus.com/ASBDC/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RoundIconButton btnicon="fa-solid:door-open" iconwidth="36">
                  Parent Portal Login
                </RoundIconButton>
              </a>
            </div>
          </Col>

          <Col md={6} className="text-center my-3">
            <strong>For new students with no siblings at ASB</strong>

            <h6 className="fw-light text-start">
              If you are applying to The Asian School for the first time OR DO
              NOT have a child currently studying at The Asian School, please
              read the instructional document AND Login to the Admission Portal
            </h6>

            <Link
              href="/pdf/admission-instructions/Online-Application-Process-for-General-Admissions.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadButton btnicon="">
                <h6 className="mb-0">
                  <Icon
                    icon="material-symbols:download-rounded"
                    width={24}
                    className="me-3"
                  />
                  Instructional document (New admission)
                </h6>
              </DownloadButton>
            </Link>

            <div className="mx-auto my-3 text-center">
              <a
                href="https://asbdc.ethdigitalcampus.com/OAWeb?dbConnVar=ASBDC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RoundIconButton btnicon="fa-solid:door-open" iconwidth="36">
                  Admission Portal Registration
                </RoundIconButton>
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
