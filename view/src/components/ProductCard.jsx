import React from "react";

function ProductCard() {
  return (
    <div className="mx-2">
      <div className="mx-auto mt-11 w-80  overflow-hidden rounded-lg bg-white ">
        <img
          className="h-48 w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium  text-gray-900">
            Product Name
          </h2>
          <p className="mb-2 text-base  text-gray-700">
            Product description goes here.
          </p>
          <div className="flex items-center justify-between mx-1">
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold text-gray-900 ">
                $20.00
              </p>
              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
