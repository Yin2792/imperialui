import React from "react";
import { MediaQueryProvider } from "react-media-query-hoc";
// import "jquery/dist/jquery.js";
//  import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
import { CookiesProvider } from 'react-cookie';
import AppRoute from "./appRoute";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
toast.configure({
  autoClose: 2000,
  draggable: false,
  
})
const App = props => {
  const customQueries = {
    mobile: "screen and  (max-width:767px)" /* (max-width: 640px) */,
    tablet: "screen and (min-width:768px) and (max-width: 1024px)",
    desktop: "screen and (min-width:1025px) and (min-width: 1441px)"
  };
  return (
    <MediaQueryProvider queries={customQueries}>
      <CookiesProvider>
        <AppRoute />
      </CookiesProvider>
    </MediaQueryProvider>
  );
};

export default App
