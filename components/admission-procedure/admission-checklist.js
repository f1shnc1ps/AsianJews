import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
 
const CheckListComp = ({ children }) => (
  <ul className="admission-checklist">
     {children} 
  </ul>
);

const SuperScript = ({ children }) => (
  <sup style={{ marginLeft: "0" }}>{children}</sup>
);

const options = {
  renderNode: { 
    [BLOCKS.UL_LIST]: (node, children) => <CheckListComp>{children}</CheckListComp>,
  },
  renderMark: {
    [MARKS.CODE]: (text) => <SuperScript>{text}</SuperScript>,
  },
}; 

export default function AdmissionChecklist({ description }) {
  return <>{documentToReactComponents(description.json, options)}</>;
}
