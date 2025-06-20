import * as React from "react";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Tambahkan warna baru untuk stepper
const stepperVariants = cva("flex items-center justify-between", {
  variants: {
    orientation: {
      horizontal: "flex-row w-full",
      vertical: "flex-col h-full",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

const stepVariants = cva("flex items-center gap-2", {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// Tambahkan animasi dan warna pada step icon
const stepIconVariants = cva(
  "flex items-center justify-center rounded-full border transition-all duration-300",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "",
      },
      size: {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
      },
      status: {
        incomplete: "border-gray-300 bg-white text-gray-400",
        active:
          "border-blue-500 bg-blue-500 text-white shadow-lg scale-110 ring-2 ring-blue-200",
        completed:
          "border-green-500 bg-green-500 text-white shadow-md scale-105 ring-2 ring-green-200",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
      status: "incomplete",
    },
  }
);

// Tambahkan animasi dan warna pada connector
const connectorVariants = cva("flex-1 transition-all duration-300", {
  variants: {
    orientation: {
      horizontal: "h-[3px] my-2",
      vertical: "w-[3px] mx-4",
    },
    status: {
      incomplete: "bg-gray-200",
      active: "bg-blue-400",
      completed: "bg-green-400",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    status: "incomplete",
  },
});

const Stepper = React.forwardRef(
  (
    {
      steps = [],
      activeStep = 0,
      orientation = "horizontal",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation, size }), className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = activeStep > index;
          const isLastStep = index === steps.length - 1;
          const status = isCompleted
            ? "completed"
            : isActive
            ? "active"
            : "incomplete";

          return (
            <React.Fragment key={index}>
              <div className={cn(stepVariants({ orientation }), "relative")}>
                <div
                  className={cn(
                    stepIconVariants({ orientation, size, status }),
                    "transition-all duration-300"
                  )}
                >
                  {isCompleted ? (
                    <Check
                      className={cn(
                        size === "sm" && "h-3 w-3",
                        size === "md" && "h-4 w-4",
                        size === "lg" && "h-5 w-5"
                      )}
                    />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-center">
                  {step.label && (
                    <div
                      className={cn(
                        "font-medium transition-colors duration-300",
                        isActive
                          ? "text-blue-700"
                          : isCompleted
                          ? "text-green-700"
                          : "text-gray-500",
                        size === "sm"
                          ? "text-xs"
                          : size === "md"
                          ? "text-sm"
                          : "text-base"
                      )}
                    >
                      {step.label}
                    </div>
                  )}
                  {step.description && (
                    <div
                      className={cn(
                        "transition-colors duration-300",
                        isActive
                          ? "text-blue-400"
                          : isCompleted
                          ? "text-green-400"
                          : "text-gray-400",
                        size === "sm"
                          ? "text-xs"
                          : size === "md"
                          ? "text-xs"
                          : "text-sm"
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {!isLastStep && (
                <div
                  className={cn(
                    connectorVariants({
                      orientation,
                      status: isCompleted
                        ? "completed"
                        : isActive
                        ? "active"
                        : "incomplete",
                    }),
                    "transition-all duration-300"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };
