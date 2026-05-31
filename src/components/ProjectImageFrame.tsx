import type { CSSProperties } from "react";
import { Image as ImageIcon } from "lucide-react";
import type { ProjectImage } from "../data/content";

type ProjectImageFrameProps = {
  image?: ProjectImage;
  title: string;
  large?: boolean;
};

export function ProjectImageFrame({
  image,
  title,
  large = false,
}: ProjectImageFrameProps) {
  const className = [
    "project-image-frame",
    large ? "is-large" : "",
    image?.fit === "contain" ? "is-contain" : "",
    image?.aspectRatio ? "has-aspect" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = image
    ? ({
        "--project-image-aspect":
          image.aspectRatio ?? (image.fit === "contain" && large ? "21 / 9" : "16 / 9"),
        "--project-image-fit": image.fit ?? "cover",
        "--project-image-padding":
          image.fit === "contain" ? "clamp(22px, 5vw, 58px)" : "0",
        "--project-image-position": image.objectPosition ?? "center",
      } as CSSProperties)
    : undefined;

  return (
    <figure className={className} style={style}>
      {image ? (
        <img src={image.src} alt={image.alt} />
      ) : (
        <div className="project-image-empty" aria-label={`${title} image slot`} role="img">
          <ImageIcon size={large ? 44 : 30} strokeWidth={1.6} />
        </div>
      )}
    </figure>
  );
}
