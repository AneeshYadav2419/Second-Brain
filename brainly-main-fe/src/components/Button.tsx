import type { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary" | "normal";
    text:string;
    startIcon?:ReactElement;
    onClick?:() => void;
    fullWidth?:boolean
    loading?:boolean

}

const variantClasses = {
    "primary":"bg-blue-600 text-white" ,
    "secondary":"bg-purple-200 text-purple-600",
    "normal":"bg-gray-200 text-black"
};

const defaultStyles = "px-4 py-2  rounded-md font-light flex items-center";

export function Button({variant,text,startIcon,onClick,fullWidth}:ButtonProps){
    return <button onClick={onClick} className={variantClasses[variant] + " " +
        defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" :""}`}>
            <div className="pr-2 ">
                  {startIcon}
            </div>
      {text}
    </button>
}
