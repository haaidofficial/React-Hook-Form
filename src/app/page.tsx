import { FormContextProvider } from "./Contexts/FormContext";
import { StepperComponent } from "./Main/StepperComponent";

export default function Home() {
  return (
    <FormContextProvider>
      <StepperComponent />
    </FormContextProvider>

  );
}
