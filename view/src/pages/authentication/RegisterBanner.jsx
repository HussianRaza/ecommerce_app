import { useNavigate } from "react-router-dom";

function RegisterBanner() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Shoe Shop.
                </h2>
                <p className="max-w-xl mt-3 text-white font-bold">
                  Discover the perfect pair for every step of your journey. From
                  sleek and sophisticated to casual comfort, our collection has
                  something for every style and occasion. Step up your footwear
                  game with us today!
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img className="w-auto h-20 sm:h-18" src="shoe.svg" alt="" />
                </div>
                <p className="mt-3 text-xl text-gray-500 dark:text-gray-300">
                  Your Account Is Created Succcesfully Please Sign In To Buy
                  Shoes.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-3 w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterBanner;
