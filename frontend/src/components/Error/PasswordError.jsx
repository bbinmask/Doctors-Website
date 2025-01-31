import React from "react";

const PasswordError = ({ error }) => {
  return <div className="text-red-600 leading-8 text-sm">{error}</div>;
};

export default PasswordError;
