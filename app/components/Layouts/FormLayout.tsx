import { FormGuidelines } from "../Form/FormGuidelines";
import { FormTextArea } from "../Form/FormTextArea";

export const FormLayout = () => {
  return (
    <div
      id="form-layout"
      className="flex flex-col gap-4 max-w-[42.5rem] mx-auto w-full"
    >
      <FormGuidelines />
      <FormTextArea />
    </div>
  );
};
