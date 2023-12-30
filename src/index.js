import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
// import App from "./App";
import App from "./App-v1";

// import Starrating from "./Starrating";
// function Test() {
//   const [movierating, setmovierating] = useState(0);
//   return (
//     <>
//       <div>
//         <Starrating color="blue" onsetmovierating={setmovierating} />
//       </div>
//       <p>this is rated {movierating}</p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <Starrating
      maxrating={5}
      size={24}
      color="#ffc419"
      className="test"
      message={["Bad", "Fine", "Average", "Good", "Awesome"]}
      defaultrating={1}
    />
    <Test /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
