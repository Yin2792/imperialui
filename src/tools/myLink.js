import React from "react";
import { Link } from "react-router-dom";

import * as Colors from "../config/colorConfig";

const MyLink = props => {
  const { text, style, className, id, to } = props;
  const defaultStyle = {
    textDecoration: "none",
    color: Colors.textWhite,
    width: "100%"
  };
  const userStyle = style === undefined ? {} : style;
  return (
    <Link
      id={`${id}`}
      className={className}
      style={{ ...defaultStyle, ...userStyle }}
      to={to===undefined?'#':to}
    >
      {text}
    </Link>
  );
};

export default MyLink;
