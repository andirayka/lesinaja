import React from "react";

const CardTable = ({ headerValues, contentValues }) => {
  return (
    <div>
      <div className="flex flex-row py-4">
        {headerValues.map((header, key) => {
          return (
            <div className="flex-1 text-center font-semibold" key={key}>
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
