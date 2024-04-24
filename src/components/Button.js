import React, { memo } from "react";


const Button = ({ text, textColor, bgColor, IcAfter, IcBefore, onClick, fullwidth, px }) => {
    return (
        <button
            type="button"
            className={`py-2 px-4 ${px} ${textColor} ${bgColor} ${fullwidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
            onClick={onClick}
        >
            {IcBefore && <IcBefore />}
            {text}
            {IcAfter && <IcAfter />}
        </button>
    )
}
export default memo(Button)