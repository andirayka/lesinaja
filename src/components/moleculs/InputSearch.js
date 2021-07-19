import React, {useState} from "react";
import DataRandom from "./data_random.json";

const InputSearch = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div>
            <div className="mt-5 rounded-lg outline-none px-1 h-10 w-full bg-gray-700 bg-opacity-75">
                <input
                    type="search" 
                    placeholder="Cari dong Om masa Enggak" 
                    className="w-full rounded-lg outline-none bg-transparent py-2 text-white inline-block" 
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
            </div>
            <div>
                {DataRandom.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    }
                    else if (val.first_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    return (
                        <div key={key}>
                            <a>{val.first_name} </a>
                            <a>{val.email}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default InputSearch