import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS } from "@contentful/rich-text-types";

const SuperScript = ({ children }) => (
  <sup style={{ marginLeft: "0" }}>{children}</sup>
);

const options = {
  renderMark: {
    [MARKS.CODE]: (text) => <SuperScript>{text}</SuperScript>,
  },
};

export default function RichTextBlock({ description }) {
  return (
    <>
      {documentToReactComponents(description?.json, options)}
    </>
  );
}
