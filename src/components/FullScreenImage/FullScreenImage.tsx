import React from "react";
import styles from "./FullScreenImage.module.css";
import useEscapeKey from "../../hooks/useEscapeKey";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

interface FullScreenImageProps {
  src: string;
  onClose: () => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({ src, onClose }) => {
  useEscapeKey(onClose);

  if (src === "") {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <p className={styles.close} onClick={onClose}>
        Close
      </p>
      <LazyLoadImage src={src} />
    </div>
  );
};

export default FullScreenImage;
