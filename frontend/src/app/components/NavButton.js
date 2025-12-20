import Link from "next/link";

export default function NavButton({ children, href = "/" }) {
  return (
    <Link href={href}>
      <button
        className="text-xs hover:cursor-pointer
      bg-white hover:bg-black 
      text-black hover:text-white font-bold 
        border border-black
        py-2 px-4 rounded-full 
        transition-colors duration-200"
      >
        {children}
      </button>
    </Link>
  );
}
