import Link from "next/link";
import DownloadButton from "@buttons/download-button";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import RichTextBlock from "./rich-text-block"; 

export default function UpdatesModalTest({
  title,
  description,
  btnText,
  btnIcon, 
}) {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);
  const handleClose = () => setShow(false); 

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0">
          <Modal.Title className="fs-5 page-title text-center m-0">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RichTextBlock description={description} />
        </Modal.Body>
        <Modal.Footer className="border-0 mt-0 pt-0">
          <DownloadButton
            className="mt-0"
            onClick={handleClose}
            btnicon={btnIcon}
          >
            {btnText}
          </DownloadButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
