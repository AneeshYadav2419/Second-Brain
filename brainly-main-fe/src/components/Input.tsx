interface InputProps{
    placeholder :string;
    reference? :any
}

export function Input ({ placeholder , reference} : InputProps){
    return <div className="w-full">
        <input ref={reference} placeholder={placeholder} type={"text"} className="w-full px-4 py-2 border rounded m-2"
        ></input>
    </div>
}