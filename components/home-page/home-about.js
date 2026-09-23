import RichTextBlock from "@display-items/rich-text-block";

export default function HomeAbout({ title, description }) {
  return (
    <>
      <h3 className="text-center text-uppercase my-3">{title}</h3>
      <RichTextBlock description={description} />
    </>
  );
}
