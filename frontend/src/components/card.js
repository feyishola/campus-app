// function CardComponent({ name }) {
//   return (
//     <div className="max-w-sm shadow-2xl p-5">
//       <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
//         {name}
//       </h5>
//       <h5 className="mb-4 text-xl  font-medium text-gray-500 dark:text-gray-400">
//         Sub Unit(s)
//       </h5>
//       <ul className="my-7 space-y-5">
//         <li className="flex space-x-3">
//           <svg
//             className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
//             class 1
//           </span>
//         </li>
//         <li className="flex space-x-3">
//           <svg
//             className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
//             class 2
//           </span>
//         </li>
//         <li className="flex space-x-3">
//           <svg
//             className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
//             class 3
//           </span>
//         </li>
//       </ul>
//       {/* <button
//         type="button"
//         className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
//       >
//         Choose plan
//       </button> */}
//     </div>
//   );
// }
// export default CardComponent;

function CardComponent({ name, spaces = [] }) {
  return (
    <div className="max-w-sm shadow-2xl p-5">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {name}
      </h5>
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        Spaces
      </h5>
      {spaces.length > 0 ? (
        <ul className="my-7 space-y-5">
          {spaces.map((space, index) => (
            <li key={index} className="flex space-x-3">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {space.name} ({space.type})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No spaces available</p>
      )}
    </div>
  );
}

export default CardComponent;
