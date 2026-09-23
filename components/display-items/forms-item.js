import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DownloadButton from "@buttons/download-button";

export default function FormsItem({
  btnicon,
  icon,
  title,
  subtitle,
  url,
  link,
  btntext,
}) {
  return (
    <>
      <Col lg={4} md={6}>
        <Card className="text-center border-0 my-5">
          <div className="text-center">
            <Icon
              icon={icon}
              width="100"
              inline={true}
              className="text-asb-main"
            />
          </div>
          <Card.Body>
            <Card.Title className="mb-0 fw-bold fs-6">{title}</Card.Title>
            <Card.Text className="mb-1 fs-6">{subtitle}</Card.Text>

            <div>
              {url ? (
                <Link href={url.url} target="_blank" rel="noopener noreferrer">
                  <DownloadButton btnicon={btnicon}>{btntext}</DownloadButton>
                </Link>
              ) : null}
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <DownloadButton btnicon={btnicon}>{btntext}</DownloadButton>
                </a>
              ) : null}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
