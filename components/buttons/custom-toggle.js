import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { Icon } from "@iconify/react";

export default function CustomToggle({ children, eventKey }) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = useAccordionButton(eventKey, () =>
    setIsActive(!isActive)
  );

  return (
    <Container>
      <Col className="mx-auto">
        <button
          className="rounded-0 d-flex"
          type="button"
          style={{ backgroundColor: "var(--asb-accent)", border: "none" }}
          onClick={handleClick}
        >
          <Icon
            icon="bi:chevron-down"
            style={{
              transform: isActive ? "rotate(180deg)" : "",
              transition: "transform 0.5s ease-in-out",
              color: "black",
            }}
            className="me-3 my-auto"
            width={25}
          />
          <h5 className="text-uppercase text-dark fw-bold mb-0">{children}</h5>
        </button>
      </Col>
    </Container>
  );
}
