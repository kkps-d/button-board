import { useEffect, useRef, useState } from "react";
import styles from "./ImageFrame.module.css";

// Sample every n pixels
const PIXEL_SKIP_COUNT = 5;

function ImageFrame({ description, gridSize }) {
  const { label, labelPosition, src, imageFit } = description.state;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (imageLoaded) {
      const canvas = document.createElement("canvas");
      let width = (canvas.width = imgRef.current.naturalWidth);
      let height = (canvas.height = imgRef.current.naturalHeight);
      const ctx = canvas.getContext("2d");

      // Draw the image inside the img element into a canvas
      ctx.drawImage(imgRef.current, 0, 0);

      // Get the RGBA data of the image
      let { data } = ctx.getImageData(0, 0, width, height);

      // Calculate which quarter of the image to sample
      let startIndex, endIndex;
      let quarterPixelsCount = width * (height / 4);
      let quarterRgbaValuesCount = 4 * quarterPixelsCount;
      if (labelPosition === "top") {
        // Sample the top quarter
        startIndex = 0;
        endIndex = quarterRgbaValuesCount;
      } else {
        // Sample the bottom quarter
        endIndex = data.length;
        startIndex = endIndex - quarterRgbaValuesCount;
      }

      // Sum up the RGBA values
      const rgba = { r: 0, g: 0, b: 0, a: 0 };
      for (let i = startIndex; i < endIndex; i += 4 * PIXEL_SKIP_COUNT) {
        rgba.r += data[i];
        rgba.g += data[i + 1];
        rgba.b += data[i + 2];
        rgba.a += data[i + 3];
      }

      // Find the average RGBA values
      rgba.r /= quarterPixelsCount / PIXEL_SKIP_COUNT;
      rgba.g /= quarterPixelsCount / PIXEL_SKIP_COUNT;
      rgba.b /= quarterPixelsCount / PIXEL_SKIP_COUNT;
      rgba.a /= quarterPixelsCount / PIXEL_SKIP_COUNT;

      // Convert RGB to luminance
      // https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
      let luminance = (0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b) / 255;
      console.log(luminance);

      if (luminance > 0.5) {
        labelRef.current.classList.add(styles.dark);
        labelRef.current.classList.remove(styles.light);
        console.log("bright image");
      } else {
        labelRef.current.classList.add(styles.light);
        labelRef.current.classList.remove(styles.dark);
        console.log("dark image");
      }
    }
  }, [imageLoaded, imgRef, labelRef, labelPosition, gridSize]);

  return (
    <div className={`widget ${styles.imageFrame}`}>
      <img
        onLoad={() => setImageLoaded(true)}
        style={{ objectFit: imageFit }}
        src={src}
        alt={label}
        ref={imgRef}
      />
      <div
        className={`${styles.labelContainer} ${
          labelPosition === "top" ? styles.top : styles.bottom
        }`}
      >
        <div ref={labelRef} className={`${styles.label} ${styles[gridSize]}`}>
          {label}
        </div>
      </div>
    </div>
  );
}

export default ImageFrame;
