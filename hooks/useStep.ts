import { useCallback, useEffect, useState } from "react";

const useStep = (initialStep = 0, numberSteps = 1, loopable = false) => {
  const isInRange = useCallback(
    (num: number) => num >= 0 || num <= numberSteps - 1,
    [numberSteps],
  );

  const [step, setStep] = useState(isInRange(initialStep) ? initialStep : 0);
  const [direction, setDirection] = useState(0);
  const hasPreviousStep =
    (loopable && numberSteps > 1) || (!loopable && step - 1 >= 0);
  const hasNextStep =
    (loopable && numberSteps > 1) || (!loopable && step + 1 <= numberSteps - 1);

  // reset step when number of steps change
  useEffect(() => {
    setStep(0);
  }, [numberSteps]);

  const next = () => {
    setDirection(1);
    if (step + 1 > numberSteps - 1) {
      if (loopable) setStep(0);
      else return;
    } else {
      setStep(step + 1);
    }
  };

  const previous = () => {
    setDirection(-1);
    if (step - 1 < 0) {
      if (loopable) setStep(numberSteps - 1);
      else return;
    } else {
      setStep(step - 1);
    }
  };

  const goToStep = useCallback(
    (index: number) => {
      if (isInRange(index)) {
        setStep(index);
      } else {
        setStep(0);
      }
    },
    [isInRange],
  );

  return {
    step,
    direction,
    next,
    previous,
    setStep: goToStep,
    hasPreviousStep,
    hasNextStep,
    numberSteps,
  };
};

export default useStep;
