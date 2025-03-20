import { FC, LabelHTMLAttributes, memo } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: FC<Props> = ({ children, className, ...props }) => {
  return (
    <label className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
};

export default memo(Label);
