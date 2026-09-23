import React, { useState } from "react";
import Image from "next/image";
import { imgblurDataURL } from "../../lib/constants";
import Card from "react-bootstrap/Card";
import RichTextBlock from "@display-items/rich-text-block";
import DownloadButton from "@buttons/download-button";

export default function TopManagementThreeCol({
  profilePicture,
  name,
  role,
  description,
}) {
  const [isShowMore, setIsShowMore] = useState(false);
  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <>
      <Card className="border-0 mb-5">
        <Card.Body>
          <div className="px-1">
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
              <h6 className="text-center text-asb-secondary">{name}</h6>
            ) : null}
          </div>
          <Card.Title className="mb-3">
            {role ? (
              <h3 className="text-asb-main text-center fw-bold">{role}</h3>
            ) : null}
          </Card.Title>
          {description ? (
            <>
              {!isShowMore && (
                <div className="p-1 text-justify truncate">
                  <RichTextBlock description={description} />
                </div>
              )}
              {isShowMore && (
                <div className="p-1 text-justify">
                  <RichTextBlock description={description} />
                </div>
              )}
              <DownloadButton onClick={toggleReadMoreLess}>
                {isShowMore ? "Read Less" : "Read More"}
              </DownloadButton>
            </>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
}
