import { useState } from "react";
import Spinner from "../Spinner/Spinner";

interface LazyLoadImageProps {
  src: string;
  alt?: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ src, alt = "" }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: loading ? "none" : "block",
          width: "100%",
          cursor: "pointer",
        }}
        onLoad={(_) => {
          setLoading(false);
        }}
      />

      <Spinner show={loading} />
    </div>
  );
};

export default LazyLoadImage;
