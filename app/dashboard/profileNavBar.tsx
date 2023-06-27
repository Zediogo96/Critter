import React, { useState } from "react";

function ProfileNavbar() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index: any) => {
    setActiveButton(index);
  };

  return (
    <nav className="flex justify-evenly">
      <button
        className={`px-4 py-2 w-full h-full text-black font-bold hover:bg-blue-300 ${
          activeButton === 0 ? "link-underline-profile" : ""
        }`}
        onClick={() => handleButtonClick(0)}
      >
        Tweets
      </button>
      <button
        className={`px-4 py-2 w-full text-black font-bold hover:bg-blue-300 ${
          activeButton === 1 ? "link-underline-profile" : ""
        }`}
        onClick={() => handleButtonClick(1)}
      >
        Replies
      </button>
      <button
        className={`px-4 py-2 w-full text-black font-bold hover:bg-blue-300 ${
          activeButton === 2 ? "link-underline-profile" : ""
        }`}
        onClick={() => handleButtonClick(2)}
      >
        Media
      </button>
      <button
        className={`px-4 py-2 w-full text-black font-bold hover:bg-blue-300 ${
          activeButton === 3 ? "link-underline-profile" : ""
        }`}
        onClick={() => handleButtonClick(3)}
      >
        Likes
      </button>
    </nav>
  );
}

export default ProfileNavbar;
