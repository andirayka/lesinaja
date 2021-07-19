import React, {useState} from "react";

const InputSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="mt-5 rounded-lg outline-none px-1 h-10 w-full bg-gray-700 bg-opacity-75">
            <input
                type="search" 
                placeholder="Cari dong Om masa Enggak" 
                className="w-full rounded-lg outline-none bg-transparent py-2 text-white inline-block" 
            />
        </div>
    )
}

export default InputSearch