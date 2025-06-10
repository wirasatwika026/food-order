import { Fragment, useEffect, useState } from "react";
import { Button, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useToastContext } from "@/contexts/ToastContext";

const individualToastStyles = {
  success: {
    Icon: CheckCircleIcon,
    containerClasses:
      "bg-green-50 dark:bg-green-900 border-green-400 dark:border-green-600 text-green-700 dark:text-green-200",
    iconClasses: "text-green-500 dark:text-green-400",
    buttonClasses:
      "text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-offset-green-50 dark:focus:ring-offset-green-900",
  },
  error: {
    Icon: XCircleIcon,
    containerClasses:
      "bg-red-50 dark:bg-red-900 border-red-400 dark:border-red-600 text-red-700 dark:text-red-200",
    iconClasses: "text-red-500 dark:text-red-400",
    buttonClasses:
      "text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 focus:ring-red-500 dark:focus:ring-red-600 focus:ring-offset-red-50 dark:focus:ring-offset-red-900",
  },
  info: {
    Icon: InformationCircleIcon,
    containerClasses:
      "bg-blue-50 dark:bg-blue-900 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-200",
    iconClasses: "text-blue-500 dark:text-blue-400",
    buttonClasses:
      "text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-900",
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    containerClasses:
      "bg-yellow-50 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-600 text-yellow-700 dark:text-yellow-200",
    iconClasses: "text-yellow-500 dark:text-yellow-400",
    buttonClasses:
      "text-yellow-500 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-800 focus:ring-yellow-500 dark:focus:ring-yellow-600 focus:ring-offset-yellow-50 dark:focus:ring-offset-yellow-900",
  },
};

// Component for rendering a single toast message
function IndividualToastMessage({ toastInfo, onRemove }) {
  const [isVisible, setIsVisible] = useState(true);
  const config =
    individualToastStyles[toastInfo.type] || individualToastStyles.info;
  const { Icon, containerClasses, iconClasses, buttonClasses } = config;

  const handleClose = () => {
    setIsVisible(false); // Start fade out animation
  };

  useEffect(() => {
    if (toastInfo.duration && toastInfo.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toastInfo.duration);
      return () => clearTimeout(timer);
    }
  }, [toastInfo.duration]);

  const handleExited = () => {
    onRemove(toastInfo.id);
  };

  return (
    <Transition
      show={isVisible}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-full"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-full"
      afterLeave={handleExited} // Remove the toast from state after animation
    >
      <div
        className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 border ${containerClasses}`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${iconClasses}`} aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{toastInfo.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <Button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses}`}
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

const DEFAULT_POSITION_CLASSES = "fixed top-6 right-6 z-[100] w-full max-w-sm";

export default function ToastContainer({
  positionClasses = DEFAULT_POSITION_CLASSES,
}) {
  const { toasts, removeToast } = useToastContext();

  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    <div aria-live="assertive" className={positionClasses}>
      <div className="flex flex-col items-end space-y-2">
        {toasts.map((toast) => (
          <IndividualToastMessage
            key={toast.id}
            toastInfo={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
}
