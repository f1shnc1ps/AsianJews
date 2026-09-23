import { Icon } from "@iconify/react";

export default function LeftButton({ onClick }) {
  return ( 
      <button className="button-control left" type="button" onClick={onClick}> 
        <Icon icon="mdi:chevron-left"/>
      </button> 
  );
}
