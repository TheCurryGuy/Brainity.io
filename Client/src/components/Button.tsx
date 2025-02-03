import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    onClick: () => void;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    loading?: boolean;
    className?: string;
}

const variantStyles = {
    primary: "bg-[#8200DB] text-white",
    secondary: "bg-[#E0E7FF] text-[#483EBE]",
};

const sizeStyles = {
    sm: "p-1 w-20 md:w-26", 
    md: "px-6 py-2.5 md:text-lg text-xs md:px-3 md:py-2.5 md:w-40", 
    lg: "p-1 w-16 md:p-0 md:w-46 text-sm md:text-lg", 
};

const defaultStyles =
    "rounded-lg cursor-pointer flex justify-center items-center disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed";

export const Button = (props: ButtonProps) => {
    return (
        <button
            disabled={props.loading}
            onClick={props.onClick}
            className={`${variantStyles[props.variant]} ${defaultStyles} ${props.className} ${sizeStyles[props.size]}`}
        >
            <div className="flex items-center">
                {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
                {props.text}
                {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
            </div>
        </button>
    );
};