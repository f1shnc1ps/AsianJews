import React from "react";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import RichTextBlock from "@display-items/rich-text-block";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function CompetionCard({ title, text, description, image }) {
  return (
    <>
      <Col md={6} lg={4} className="py-3 px-1 mx-auto bg-asb-accent">
        <Card className="border-0 rounded-0 bg-asb-accent">
          <div className="text-center">
            <Image
              className="img-fluid"
              src={image}
              // alt={title}
              alt=""
              width={300}
              height={200}
            />
          </div>
          <Card.Body>
            <h5 className="text-center">{title}</h5>
            <span className="text-center fw-normal text-asb-secondary">
              {documentToReactComponents(description?.json)}
            </span>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
