import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import env from "../config";
import buildingImg from "../images/whitehouse.jpeg";

function BuildingDetails() {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    axios
      .get(`${env.BASE_URL}/buildings/${id}`)
      .then((response) => {
        setBuilding(response.data.payload);
      })
      .catch((error) => {
        console.error("Error fetching building details:", error);
      });
  }, [id]);

  if (!building) {
    return <div>Loading...</div>;
  }

  return (
    // <div>
    //   <h1>{building.buildingName}</h1>
    //   <p>Year Constructed: {building.yearConstructed}</p>
    //   <img src={building.image} alt={building.buildingName} />
    // </div>
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <nav className="flex">
          <ol className="flex items-center">
            <li className="text-left">
              <div className="-m-1">
                <Link to={"/"}>
                  <p className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                    {" "}
                    Home{" "}
                  </p>
                </Link>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <p className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
                    {" "}
                    Buildings{" "}
                  </p>
                </div>
              </div>
            </li>

            <li className="text-left">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <div className="-m-1">
                  <p
                    className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    aria-current="page"
                  >
                    {" "}
                    Details{" "}
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={buildingImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {building.buildingName}
            </h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
                <svg
                  className="block h-4 w-4 align-middle text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    className=""
                  ></path>
                </svg>
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">
                1,209 Reviews
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">500</h1>
                <span className="text-base">/sqm</span>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <Link to={`/locate-building/${building._id}`}>Locate</Link>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <p className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                  {" "}
                  Description{" "}
                </p>
              </nav>
            </div>

            <div className="mt-8 flow-root sm:mt-12">
              <h1 className="text-3xl font-bold">Delivered To Your Door</h1>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                accusantium nesciunt fuga.
              </p>
              <h1 className="mt-8 text-3xl font-bold">
                From the Fine Farms of Brazil
              </h1>
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                numquam enim facere.
              </p>
              <p className="mt-4">
                Amet consectetur adipisicing elit. Optio numquam enim facere.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                rerum nostrum eius facere, ad neque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildingDetails;
