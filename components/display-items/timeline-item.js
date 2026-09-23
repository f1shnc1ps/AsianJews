import { Icon } from "@iconify/react";

export default function TimelineItem({ leftRight, text, year, icon }) {
  return (
    <div>
      <div className={leftRight}>
        <div className="date">{year}</div> 
        <Icon icon={icon} className="icon" width={30}/> 
        <div className="content">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
