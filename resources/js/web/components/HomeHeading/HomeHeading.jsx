import React from "react";
import styles from "./styles.module.scss";

const HomeHeading = ({ children }) => {
  return (
    <div
      className={`text-center ${styles.homeHeading} py-5 md:py-16 uppercase`}
    >
      <span
        className={`text-xs lg:text-base inline-block bg-primary-300 text-white px-3 py-1 rounded-md`}
      >
        {children}
      </span>
    </div>
  );
};

export default HomeHeading;
