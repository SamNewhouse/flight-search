import { FC, memo, PropsWithChildren, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const BaseLayout: FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 ${className}`}>
      <div className="w-full max-w-4xl px-6 py-8 bg-white shadow-lg rounded-lg">{children}</div>
    </div>
  );
};

export default memo<PropsWithChildren<Props>>(BaseLayout);
