"use client";

export default function IconButton({ children }) {

  const handleClick = () => {
    window.open("https://github.com/Muhimen123/SuperSnippets", "_blank");
  }

  return (
    <a
      onClick={handleClick}
      className={`
        flex items-center gap-2 
      bg-black text-white text-sm 
        py-2 px-4 
        rounded-lg hover:cursor-pointer
      `}>
      <img src="/github-mark-white.svg" height={30} width={30}></img>
      {children}
    </a>
  );
}
