import Link from "next/link";
import Tab from "react-bootstrap/Tab";
// import ListGroup from "react-bootstrap/ListGroup";
import RoundIconButton from "@buttons/round-icon-button";

export default function QuickLinks({
  text,
  type,
  weight,
  target,
  btnIcon,
  iconWidth,
  url,
}) {
  return (
    <>
      {/* <Tab eventKey={type} title={type} className="homemenu"> */}
      {/* <ListGroup
          horizontal
          className="d-flex flex-wrap justify-content-evenly border-0 rounded-0 p-2 p-lg-5 bg-asb-accent"
           
        >  */}
      <Link href={url} target={target} rel="noopener noreferrer">
        <RoundIconButton text={text} iconwidth={iconWidth} btnicon={btnIcon} />
      </Link>

      {/* </ListGroup>  */}
    </>
  );
}
