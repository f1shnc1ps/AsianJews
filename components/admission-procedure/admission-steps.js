import RichTextBlock from "@display-items/rich-text-block";

export default function AdmissionSteps({ steps, description }) {
  return (
    <>
      <div className="step-container">
        <div>
          <h4 className="text-uppercase mb-4">{steps}</h4>
          <RichTextBlock description={description}/> 
        </div>
      </div>
    </>
  );
}
