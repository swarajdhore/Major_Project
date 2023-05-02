import React from "react";
import "./ErrorPage404.css";

function ErrorPage(props) {
  return (
    <div class="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-[#D7D2D8] w-full height-of-page">
      <div class="text-center">
        <div class="inline-flex rounded-full bg-yellow-100 p-4">
          <div class="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
            <svg
              class="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
          Oops - {props.message}
        </h1>
        {/* <p class="text-slate-600 mt-5 lg:text-lg">
          The page you are looking for doesn't exist or <br />
          has been removed.
        </p> */}
        <div className="py-8">
          <button
            type="button"
            class="bg-[#DBEAFE] hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          >
            <a href="/">
              <div class="flex flex-row align-middle">
                <span class="mr-2">Go back to Home </span>
                <svg
                  class="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
