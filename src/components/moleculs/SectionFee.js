import React from "react";

const SectionFee = ({ heading, value }) => {
    return (
        <div className="text-center md:px-80 px-20 mb-4">
            <h2 className="font-medium text-xl">{heading}</h2>
            <div>
                <div className="font-medium text-4xl">{value}</div>
                <hr className="border-solid border-black border-2" />
            </div>
        </div>
    )
}

export default SectionFee