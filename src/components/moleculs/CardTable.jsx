import React from "react";

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
