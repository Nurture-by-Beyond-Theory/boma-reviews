import React from "react";
import Link from "next/link";

type LinkButtonProps = {
  href: string;
  theme: string;
  label: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({ href, theme, label}) => {
  const baseStyles = "inline-block text-sm md:text-xl text-center duration-300 transform leading-normal text-light transition-transform lg:px-8 md:px-4 px-16 py-2 rounded-lg  lg:font-semibold shadow-[0px_4px_5px_0px_rgba(0,_0,_0,_0.1)] hover:translate-y-[-5px] hover:opacity-80 focus:translate-y-0 focus:opacity-100";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${theme}`}
    >
      {label}
    </Link>
  );
};

export default LinkButton;

