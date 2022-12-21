import { HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  className,
  ...restProps
}: HTMLAttributes<HTMLButtonElement>) => {
  const buttonStyles = classNames(
    "text-black",
    "p-2",
    "rounded",
    "transition-colors"
  );

  return (
    <button className={twMerge(buttonStyles, className)} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
