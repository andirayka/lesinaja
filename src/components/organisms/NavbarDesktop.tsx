import React, { FC } from "react";
import { LoadIcon } from "@components";

type Props = {
  imgSrc?: string;
  name?: string;
};

export const NavbarDesktop: FC<Props> = ({ imgSrc, name }) => {
  return (
    <nav className="hidden md:block px-8 py-2 bg-yellow-400 mb-8 flex h-14">
      <div className="flex-auto ">
        <div className="flex">
          {!imgSrc ? (
            <LoadIcon additionalClassName="text-4xl ml-auto" />
          ) : (
            <img
              src={imgSrc}
              alt=""
              className="w-11 h-10 rounded-full border-2 ml-auto mr-2"
            />
          )}
          <div className="mt-auto mb-auto">{name}</div>
        </div>
      </div>
    </nav>
  );
};
