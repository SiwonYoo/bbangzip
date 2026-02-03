interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "full" | "fit";
}

function Button({ children, size = "full", ...rest }: ButtonProps) {
  const btnSize = {
    full: "w-full p-4",
    fit: "w-fit px-4 py-2",
  };

  return (
    <>
      <button className={`rounded-xl border border-accentdark bg-white hover:bg-accentgold cursor-pointer ${btnSize[size]}`} {...rest}>
        {children}
      </button>
    </>
  );
}

export default Button;
