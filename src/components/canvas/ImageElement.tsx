import React, { useContext, useRef } from "react";
import { CanvasContext, ICanvasComponent } from "./CanvasContainer";

const ImageElement = (props: ICanvasComponent) => {
  const { content, id, dimension } = props;
  const { actions } = useContext(CanvasContext);
  const uploadRef = useRef<HTMLInputElement>(null);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const getImageDimensions = (file: string): Promise<{ w: number; h: number; nw: number; nh: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        resolve({ w: img.width, h: img.height, nw: img.naturalWidth, nh: img.naturalHeight });
      };
      img.src = file;
    });
  };

  const getAdjustedDimensions = (width: number, height: number, resultWidth: number) => {
    const ratio = width / height;
    return { calcWidth: resultWidth, calcHeight: resultWidth / ratio };
  };

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await getBase64(file);
      const imageDimensions = await getImageDimensions(base64);
      const { calcWidth, calcHeight } = getAdjustedDimensions(
        imageDimensions.nw,
        imageDimensions.nh,
        150
      );
      actions?.updateCanvasData({
        id,
        content: base64,
        dimension: { width: `${calcWidth}px`, height: `${calcHeight}px` }
      });
    }
  };

  const triggerUpload = () => {
    uploadRef.current?.click();
  };

  const renderUploadContent = () => {
    return (
      <>
        <input
          type="file"
          ref={uploadRef}
          onChange={imageUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
        <button onClick={triggerUpload}>Upload Image</button>
      </>
    );
  };

  const renderImage = () => {
    return (
      <img
        src={content}
        alt="Uploaded"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  };

  return (
    <div style={{ width: dimension?.width, height: dimension?.height }}>
      {!content ? renderUploadContent() : renderImage()}
    </div>
  );
};

export default ImageElement;