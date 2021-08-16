import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardTable = ({ headerValues, contentValues, additionalClassName }) => {
  return (
    <div>
      <div className={`flex flex-row py-4 ${additionalClassName}`}>
        {headerValues.map((header, key) => {
          return (
            <div
              className="flex-1 text-center font-semibold border-b-2"
              key={key}
            >
              {header}
            </div>
          );
        })}
      </div>

      {contentValues.map((content, key) => {
        return (
          <div className="flex flex-row py-4" key={key}>
            {content.map((value, key2) => {
              if (key2 == 0) {
                return (
                  <div className="text-center md:ml-28 mr-2 ml-4" key={key2}>
                    {/* <FontAwesomeIcon icon={value} size="2x" /> */}
                    <img src={value} alt="" className="w-8" />
                  </div>
                );
              } else if (key2 == 1) {
                return (
                  <div
                    className="flex-none text-lest md:w-44 w-28 md:mt-auto md:mb-auto"
                    key={key2}
                  >
                    {value}
                  </div>
                );
              }
              return (
                <div className="flex-1 text-center" key={key2}>
                  {value}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CardTable;
