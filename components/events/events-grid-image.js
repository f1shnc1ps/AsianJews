import Image from "next/image";

export default function EventsGridImage({
  key,
  index,
  left,
  top,
  photo,
  onClick,
}) {
  const { height, width, url, src, alt, title } = photo;
  return (
    <div
      className="image-container"
      key={`${key}-${index}`}
      onClick={(e) => onClick(e, { index })}
      style={{ left, top, height, width }}
    >
      <div className="overlay-container">
        <Image
          src={src}
          alt={alt}
          title={title}
          width={width}
          height={height}
        />
        <div className="caption">
          <h6>{title}</h6>
        </div>
      </div>
    </div>
  );
}
