import React from "react";
import Navbar from "../../Navbar/Navbar";

function CommingSoon() {
  return (
    <>
      <Navbar />
      <div class="h-[91vh] bg-gray-900 flex flex-col items-center justify-center relative px-4">
        <div
          class="bg-car-img absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
          //   style="background-image: url('https://images.unsplash.com/photo-1604093882750-3ed498f3178b');"
        ></div>
        {/* <h1 class="text-5xl md:text-7xl text-white font-bold mb-8 z-10">
          Coming Soon
        </h1> */}
        <h1 class="text-5xl md:text-7xl text-white font-bold mb-8 z-10">
          Coming Soon....
        </h1>
        <p class="text-white text-xl md:text-2xl">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </>
  );
}

export default CommingSoon;
