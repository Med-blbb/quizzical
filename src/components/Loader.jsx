import React from "react";
import "./LoaderStyle.css";

export default function Loader() {
  return (
    <div className="wrapper">
      <section class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </section>
    </div>
  );
}
