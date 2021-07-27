import React from "react";

const SectionContent = ({ children, containerClass, text }) => {
    return (
        <div className="m-4">
            <p className="font-bold text-xl">{text}</p>
            <div className={`bg-yellow-200 rounded-md px-4 py-4 ${containerClass}`}>
                {children}
            </div>
        </div>
    )
}

export default SectionContent