import React, { FC } from "react";

type Props = {
  children?: any;
  additionalClassName?: string;
};
export const ContentContainer: FC<Props> = ({
  children,
  additionalClassName,
}) => {
  return <div className={additionalClassName}>{children}</div>;
};
