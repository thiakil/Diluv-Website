import React, { MutableRefObject, ReactNode, useRef, useState } from "react";

function Alert(props: { className?: string, children?: ReactNode, type: "danger" | "warning" | "success" | "info", canDismiss?: boolean }) {
    const [closed, setClosed] = useState(false);
    const {
        canDismiss, type, children, className
    } = props;
    const bg = `bg-${type}-200`;
    const color = `text-${type}-800`;
    const hoverColor = `hover:text-${type}-500`;
    const border = `border-${type}-400`;

    const alertRef = useRef(null);
    if (closed) {
        return <></>;
    }
    return (
        <div className={`${className || ""} ${bg} ${color} border ${border} px-4 py-3 rounded relative`} ref={alertRef}>
            {children}
            {canDismiss && (
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
              className={`fill-current h-6 w-6 ${hoverColor} ${color}`}
              onClick={() => {
                  const { current }: MutableRefObject<any> = alertRef;
                  if (current) {
                      current.classList += " fadeout";
                  }
                  setTimeout(() => {
                      setClosed(true);
                  }, 200);
              }}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0
              1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1
              1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
            )}
        </div>
    );
}


export default Alert;
