import { Icon } from "@iconify/react"; 

export default function EventsImageOverlayHeader ({ title, images, currentIndex, onClose }) {
  return(
  <header className="top-header-bar">
    <div className="left-side-description-container">
      <h2 className="gallery-heading">{title}</h2>
      <h4 className="gallery-subheading">{images[currentIndex].title}</h4>
    </div>

    <div className="right-side-container">
      <span className="page-indicator">
        {currentIndex + 1} / {images.length}
      </span>
      <button className="button-control" type="button" onClick={onClose}> 
        <Icon icon="mdi:close-circle" />
      </button> 
    </div>
  </header>
);
}