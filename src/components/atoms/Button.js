import React from 'react';

const Button = ({bgColor, text, hover, fontColor, size, borderRadius}) => {
    return (
        <div>
            <button className={`px-4 py-3 ${borderRadius} ${size} ${bgColor} ${hover} ${fontColor}`}>{text}</button>
        </div>
    )
}

export default Button