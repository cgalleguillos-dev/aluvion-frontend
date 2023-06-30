import { useState } from "react";

const useShowPopup = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  }

  const handleHidePopup = () => {
    setShowPopup(false);
  }

  return { showPopup, handleShowPopup, handleHidePopup };
};

export default useShowPopup;