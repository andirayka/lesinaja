import React from "react";

const InputTextarea = ({ heading, value, useHookRegister }) => {
    return (
        <div className="mt-4">
            <label>{heading}</label>
            <textarea
                rows="3"
                placeholder="Masukkan alamat lengkap anda"
                {...useHookRegister}
                className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 w-full focus:border-gray-600"
            >
            {value}
            </textarea>
        </div>
    )
}

export default InputTextarea