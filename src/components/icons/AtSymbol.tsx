import React from "react";

type Props = {
    fill?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

export const AtSymbol = ({
    width = "20px",
    height = "20px",
    className = ""
}: Props) => (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`svg-icon ${className || ""}`}>
        <path
            d="M13.6 13.47A4.99 4.99 0 0 1 5 10a5 5 0 0 1 8-4V5h2v6.5a1.5 1.5 0 0 0 3 0V10a8 8 0 1 0-4.42 7.16l.9 1.79A10 10 0 1 1 20 10h-.18.17v1.5a3.5 3.5 0 0 1-6.4 1.97zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
);
export default AtSymbol;
