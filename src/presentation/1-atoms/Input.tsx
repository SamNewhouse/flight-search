import { FC, InputHTMLAttributes, memo } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<Props> = ({ className, ...props }) => {
  return <input className={`border border-gray-300 px-3 py-2 rounded focus:ring focus:ring-blue-300 ${className}`} {...props} />;
};

export default memo(Input);
