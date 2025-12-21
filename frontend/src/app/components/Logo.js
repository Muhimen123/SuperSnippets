import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo_clipboard.svg"
        width={25}
        height={25}
        alt="Clipboard Logo"
      />

      <h1 className="font-bold">
        SuperSnippets
      </h1>
    </div>
  );
}
