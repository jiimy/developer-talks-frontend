import { useEffect, useState } from "react";
import "./Scrolltop.scss";

function Scrolltop() {
  const isScrollAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

  const [showButton, setShowButton] = useState(false);
  const scrollToBottom = () => {
    //아래
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    //위
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className="scroll__container">
        <button id="top" onClick={scrollToTop} type="button">
          {" "}
          Top
        </button>
      </div>
    )
  );
  // <div
  //   className={
  //     window.scrollY < 50 && isScrollAtBottom < 50
  //       ? 'scroll__none'
  //       : 'scroll__container'
  //   }
  // >
  //   <button id="bottom" onClick={scrollToBottom} type="button">
  //     {' '}
  //     Bottom
  //   </button>
  // </div>
}
export default Scrolltop;
