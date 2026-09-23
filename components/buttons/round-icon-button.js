import Button from "react-bootstrap/Button";
import { Icon } from "@iconify/react";

export default function RoundIconButton({ text, children, iconwidth, btnicon, onClick }) {
  return (
    <>
      <Button 
        className="round-button-container text-center mx-auto"
        onClick={onClick}
      >
        <div className="round-button-icon-container shadow">
          <Icon icon={btnicon} width={iconwidth} />
        </div>
        <h4 className="round-button-text">
          {children} {text}
        </h4>
      </Button>
    </>
  );
}
