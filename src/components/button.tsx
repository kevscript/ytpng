import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`h-12 px-4 flex justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
