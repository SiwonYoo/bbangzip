interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: "full" | "fit";
}

function Button({ children, size, ...rest }: ButtonProps) {
  const btnSize = {
    full: "w-full",
    fit: "w-fit",
  };

  return (
    <>
      <button className={`p-4 my-2 rounded-xl border border-accentdark bg-wihte cursor-pointer hover:bg-accentgold ${btnSize[size]}`} {...rest}>
        {children}
      </button>
    </>
  );
}

export default Button;
