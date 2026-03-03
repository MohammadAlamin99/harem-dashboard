interface Props {
  activeStep: number;
}

export default function StepHeader({ activeStep }: Props) {
  const steps = [
    "Agent Verification",
    "Search Devices",
    "Select Cash Register",
    "Configuration",
  ];

  return (
    <div className="flex items-start justify-between mb-6 w-full">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === activeStep;
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={label}
            className="flex flex-col items-center flex-1 relative"
          >
            {/* Left line */}
            {!isFirst && (
              <div className="absolute top-4 right-1/2 left-0 h-[1px] bg-[#B9C3CC] z-0" />
            )}

            {/* Right line */}
            {!isLast && (
              <div className="absolute top-4 left-1/2 right-0 h-[1px] bg-[#B9C3CC] z-0" />
            )}

            {/* Circle */}
            <div
              className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium font-manrope ${
                isActive ? "bg-[#635BFF] text-white" : "bg-[#526B7A] text-white"
              }`}
            >
              {stepNumber}
            </div>

            {/* Label */}
            <p className="text-sm leading-5 text-center font-manrope text-[#98A4AE] mt-1">
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
