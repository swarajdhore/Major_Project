import { useEffect, useState, useRef } from "react";

import Reviews from "./Reviews";
import "./Information.css";

function Information() {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container flex justify-center">
      <div className="information-box">
        <div className="information-box-1 flex px-4">
          <span
            ref={ref}
            className={`my-element ${isVisible ? "scroll-animation" : ""}`}
          >
            "Looking to upgrade your ride? Don't settle for less! At our car
            trading Website, we make it easy to trade in your old car and get
            behind the wheel of the car of your dreams. Whether you're looking
            for a sleek and stylish sports car or a practical and reliable
            family vehicle, we have the inventory and expertise to make your car
            buying experience a breeze. So why wait? Stop by today and discover
            the thrill of driving your perfect car!"
          </span>
          <img src="/images/vector-img/images.png" alt="vector-img" />
        </div>
        <div className="review-box">
          <div className="review-box-1">
            <Reviews />
          </div>
          <div className="review-box-1">
            <Reviews />
          </div>
          <div className="review-box-1">
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
