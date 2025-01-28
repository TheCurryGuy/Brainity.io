import { ReactElement } from "react"

interface ButtonProps{
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    onClick: () => void,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    loading? : boolean
}

const variantStyles = {
    "primary": " bg-[#8200DB] text-white ",
    "secondary": " bg-[#E0E7FF] text-[#483EBE]"
}

const sizeStyles = {
    "sm": "p-1 w-26",
    "md": "px-4 py-2 uw-36",
    "lg": "p-2.5 w-46"
}

const defaultStyles = " rounded-lg cursor-pointer flex justify-center items-center disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"

export const Button = (props: ButtonProps)=>{
    return <button disabled={props.loading} onClick={props.onClick} className= {`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        <div className=" ">
        {props.startIcon}
        </div>
        {props.text}</button>

    
} //55