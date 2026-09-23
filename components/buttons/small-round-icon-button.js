import Button from "react-bootstrap/Button";
import { Icon } from "@iconify/react";

export default function SmallRoundIconButton({ children, iconwidth, btnicon, onClick }) {
  return (
    <>
      <Button 
        className="small-round-button-container"
        onClick={onClick}
      >
        <div className="small-round-button-icon-container shadow">
          <Icon icon={btnicon} width={iconwidth} />
        </div> 
        <h6 className="small-round-button-text">
          {children} 
        </h6>
      </Button>
    </>
  );
} 
