// interface InputProps{
//     placeholder :string;
//     reference? :any
// }

// export function Input ({ placeholder , reference} : InputProps){
//     return <div className="w-full">
//         <input required={true} ref={reference} placeholder={placeholder} type={"text"} className="w-full px-4 py-2 border rounded m-2"
//         ></input>
//     </div>
// }

import { RefObject } from "react";

interface InputProps {
  placeholder: string;
  reference?: RefObject<HTMLInputElement>;
  required?: boolean;
}

export function Input({ placeholder, reference, required }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        required={required}
        className="w-full px-4 py-2 border rounded m-2"
      />
    </div>
  );
}
