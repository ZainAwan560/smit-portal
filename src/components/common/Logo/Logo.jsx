import React from "react";
import logo from "../../../assets/smit-logo.png";
export default function Logo({ className = "" }) {
  return (
    <img
      className={`brand-logo ${className}`}
      src={logo}
      alt="SMIT - Saylani Mass IT Training"
    />
  );
}
