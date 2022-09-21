import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input(props: InputProps) {

    return (
        <input
            {...props} //spread operator
            className="bg-zinc-900 py-3 px-4 rounded text-sm outline-none placeholder:text-zinc-500 appearance-none"
        />
    )
}