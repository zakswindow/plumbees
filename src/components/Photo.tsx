import Image from "next/image";
import type { Img } from "@/lib/images";

export function Photo({ img, priority = false, sizes = "(max-width: 960px) 100vw, 560px" }: { img: Img; priority?: boolean; sizes?: string }) {
  return (
    <figure className="photo">
      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} priority={priority} quality={75} />
    </figure>
  );
}
