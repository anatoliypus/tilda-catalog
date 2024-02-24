import { useEffect, useState } from "react";
import styles from "../ItemPopup.module.css";
import Slider from "react-slick";
import "./ItemPopupImageSlider.css";
import { Fancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";

function ItemPopupImages({ hidden, images }) {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    !hidden && images.length && setMainImage(images[0]);
  }, [hidden]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    adaptiveHeight: true,
    swipeToSlide: true,
    slidesToScroll: 2
  };

  const mainImageClick = () => {
    const fancybox = Fancybox.show(
      images.map((image) => {
        return {
          src: image,
          type: "image",
        };
      })
    );
    fancybox.jumpTo(images.indexOf(mainImage));
  };

  return (
    <div className={`${styles.itemPopupImage} itemPopupImage`}>
      {!hidden && (
        <div
          style={{backgroundImage: `url("${mainImage}")`}}
          alt=""
          className={styles.itemPopupImagesMainImage}
          onClick={mainImageClick}
        ></div>
      )}
      <Slider {...sliderSettings}>
        {!hidden &&
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`${img === mainImage
                ? styles.itemPopupGalleryChosen
                : styles.itemPopupGalleryNotChosen} ${styles.sliderSingleImage}`}
              onClick={() => {
                setMainImage(img);
              }}
            />
          ))}
      </Slider>
    </div>
  );
}

export default ItemPopupImages;
