import React, { memo, useState } from "react";
import icons from "../ultils/icons";


const InputForm = ({ label, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
    const { FaEyeSlash, FaEye } = icons

    const [showPassword, setShowPassword] = useState(false);

    const hendleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div >
            <label htmlFor={keyPayload} className="text-sm">{label}</label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : type || 'text'}
                    id={keyPayload}
                    className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]: e.target.value }))}
                    onFocus={() => setInvalidFields && setInvalidFields([])}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-2 py-1 focus:outline-none"
                        onClick={hendleShowPassword}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
            {invalidFields?.some(i => i.name === keyPayload) && <small className="text-red-500">{invalidFields.find(i => i.name === keyPayload)?.message}</small>}
        </div>
    )
}
export default memo(InputForm)