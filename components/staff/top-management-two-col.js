import Image from "next/image";
import { imgblurDataURL } from "../../lib/constants";
import Card from "react-bootstrap/Card";
import RichTextBlock from "@display-items/rich-text-block";

export default function TopManagementTwoCol({
  profilePicture,
  name,
  role,
  description,
}) {
  return (
    <>
      <Card className="border-0 mb-5">
        <Card.Body>
          <div className="px-1 px-md-3 px-lg-5">
            {profilePicture ? (
              <Image
                className="img-fluid mb-3"
                src={profilePicture}
                placeholder="blur"
                blurDataURL={imgblurDataURL}
                width="720"
                height="720"
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
            {role ? (
              <h3 className="text-asb-main text-center fw-bold">{role}</h3>
            ) : null}
          </Card.Title>
          {description ? (
            <div className="p-1">
              <RichTextBlock description={description} />
            </div>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
}
