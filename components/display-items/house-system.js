import React from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import SmallRoundIconButton from "@buttons/small-round-icon-button";

const customMarkdownOptions = (description) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextImage
        id={node.data.target.sys.id}
        assets={description.links.assets.block}
      />
    ),
  },
});

export default function HouseSystem({ image, description, width, height }) {
  return (
    <>
      <div className="p-3">
        {documentToReactComponents(
          description.json,
          customMarkdownOptions(description)
        )}
      </div>

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
                  src={image}
                  // layout="intrinsic"
                  // placeholder="blur"
                  // blurDataURL={imgblurDataURL}
                  width={width}
                  height={height}
                  alt="Asian School Bharain"
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </Container>
    </>
  );
}
