import { useState } from "react";

const UseMultiStepForm = steps => {
    const [currentStep, setCurrentStep] = useState(0);

    const next = () => {
        setCurrentStep(i => {
            if (i >= steps.length - 1) return i;
            return i += 1;
        });
    };

    const back = () => {
        setCurrentStep(i => {
            if (i <= 0) return i;
            return i -= 1;
        });
    };

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;
    const step = steps[currentStep];

    return {
        currentStep,
        setCurrentStep,
        step,
        next,
        back,
        isFirstStep,
        isLastStep
    };
};

export default UseMultiStepForm;
