import Image from "next/image";

export function Logo({ variant = "dark", height = 26 }: { variant?: "dark" | "white"; height?: number }) {
  const src = variant === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg";
  return (
    <Image src={src} alt="Plumbees" width={Math.round(height * 6.38)} height={height} priority unoptimized />
  );
}
