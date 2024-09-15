import React from "react";

interface ImageProps {
  add_image: (url: string) => void;
  images: { image_url: string }[];
  type?: string;
  setImage?: (url: string) => void;
}

const Image: React.FC<ImageProps> = ({ add_image, images = [], type, setImage }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((item, i) => (
        <div
          key={i}
          onClick={() => type === "background" && setImage ? setImage(item?.image_url) : add_image(item?.image_url)}
          className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
        >
          <img className="w-full h-full object-fill" src={item?.image_url} alt={`image-${i}`} />
        </div>
      ))}
    </div>
  );
};

export default Image;
