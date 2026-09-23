import Image from "next/image";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Icon } from "@iconify/react";

export default function EventsGallery({ images }) {
  const [data, setData] = useState({ image: "", i: 0 });

  const viewImage = (image, i) => {
    console.log(image, i);
    setData({ image, i });
  };
  const imgAction = (action) => {
    let i = data.i;
    if (action === "next-img") {
      setData({ image: images[i + 1], i: i + 1 });
    }
    if (action === "prev-img") {
      setData({ image: images[i - 1], i: i - 1 });
    }
    if (!action) {
      setData({ image: "", i: 0 });
    }
  };
  return (
    <>
      {data.image && (
        <div className="gallery-overlay">
          <button
            className="close-btn"
            aria-label="Close"
            onClick={() => imgAction()}
          >
            <Icon icon="carbon:close-outline" color="white" width="36" />
          </button>
          <button
            className="next-prev-btn"
            onClick={() => imgAction("prev-img")}
          >
            <Icon icon="carbon:chevron-left" color="white" width="36" />
          </button>
          <Image
            className="img-fluid p-0"
            src={data.image.url}
            style={{ width: "auto", maxHeight: "90%", maxWidth: "90%" }}
            alt={data.image.url}
            width={data.image.width}
            height={data.image.height}
          />
          <button
            className="next-prev-btn"
            onClick={() => imgAction("next-img")}
          >
            <Icon icon="carbon:chevron-right" color="white" width="36" />
          </button>
        </div>
      )}
      <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 3 }}>
        <Masonry gutter="0.5rem">
          {images.map((image, i) => (
            <div key={i}>
              <Image
                className="img-fluid p-0 gallery-grid-img"
                src={image.url}
                alt={image.url}
                // layout="responsive"
                width={720}
                height={480}
                onClick={() => viewImage(image, i)}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
