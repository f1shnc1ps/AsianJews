import Image from "next/image"; 
import { imgblurDataURL } from "../../lib/constants"; 
import Card from "react-bootstrap/Card";
import RichTextBlock from "@display-items/rich-text-block";

export default function TopManagement({
  profilePicture,
  name,
  role,
  description,
}) {
  return (
    <>
      <Card className="border-0 mb-5">
        <Card.Body>
          <div className="float-md-start">
            {profilePicture ? (
              <Image
                className="img-fluid mb-3 me-0 me-md-3 me-lg-5"
                src={profilePicture}
                placeholder="blur"
                blurDataURL={imgblurDataURL}
                width="400"
                height="400"
                alt="Asian School Bharain"
              />
            ) : null}

            {name ? (
              <h6 className="text-center text-asb-secondary me-0 me-md-3 me-lg-5">
                {name}
              </h6>
            ) : null}
          </div>
          <Card.Title className="mb-3">
            {role ? <h3 className="text-asb-main fw-bold">{role}</h3> : null}
          </Card.Title>
          {description ? (
            <div className="p-1 p-lg-3">
              <RichTextBlock description={description} />
            </div>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
}
