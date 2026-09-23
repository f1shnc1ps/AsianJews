import { Icon } from "@iconify/react"; 

export default function RightButton({ onClick }) {
  return ( 
      <button className="button-control right" type="button" onClick={onClick}> 
        <Icon icon="mdi:chevron-right" />
      </button> 
  );
}
