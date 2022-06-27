import React, { useEffect, useState } from 'react';
import './Carousel.scss';

// 코드 참조: https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0

export const CarouselItem = ({ children, width }) => {
  // const [carouselImages, setCarouselImages] = useState([]);
  // useEffect(() => {
  //   fetch('/data/carouselimgData.json')
  //     .then(res => res.json())
  //     .then(data => setCarouselImages(data));
  // }, []);

  return (
    <div className="carouselItem" style={{ width: width }}>
      {/* {carouselImages.map(({ id, img }) => {
        return (
          <div key={id}>
            <img alt="" src={img} />
          </div>
        );
      })} */}
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const updateIndex = newIndex => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        updateIndex(activeIndex + 1);
      }
    }, 4000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
      <div className="indicators">
        <button
          className="prevButton"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          이전
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`choose${index === activeIndex ? ' active' : ''}`}
              onClick={() => {
                updateIndex(index);
              }}
            />
          );
        })}
        <button
          className="nextButton"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Carousel;
