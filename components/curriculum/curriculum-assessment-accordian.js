import Image from "next/image";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import SmallRoundIconButton from "@buttons/small-round-icon-button";
import CustomToggle from "@buttons/custom-toggle"

export default function CurriculumAssessmentAccordian({ weight, title, url }) {
  return (
    <>
      <Card className="rounded-0">
        <Card.Header className="bg-asb-accent text-uppercase">
          <CustomToggle eventKey={weight}>{title}</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={weight}>
          <Card.Body>
            <Container className="py-3">
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                wheel={{ activationKeys: ["Control", "Shift"] }}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <>
                    <div className="d-flex justify-content-end">
                      <SmallRoundIconButton
                        btnicon="bi:zoom-in"
                        iconwidth={15}
                        onClick={() => zoomIn()}
                      />
                      <SmallRoundIconButton
                        btnicon="bi:zoom-out"
                        iconwidth={15}
                        onClick={() => zoomOut()}
                      />
                      <SmallRoundIconButton
                        btnicon="bi:x-lg"
                        iconwidth={15}
                        onClick={() => resetTransform()}
                      />
                    </div>
                    <TransformComponent>
                      <Image
                        className="img-fluid p-0"
                        src={url}
                        alt=""
                        width={1920}
                        height={1080}
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
}
