interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "full" | "fit";
}

function Button({ children, size = "full", ...rest }: ButtonProps) {
  const btnSize = {
    full: "w-full",
    fit: "w-fit",
  };

  return (
    <>
      <button className={`p-4 my-2 rounded-xl border border-accentdark bg-wihte hover:bg-accentgold cursor-pointer ${btnSize[size]}`} {...rest}>
        {children}
      </button>
    </>
  );
}

export default Button;
