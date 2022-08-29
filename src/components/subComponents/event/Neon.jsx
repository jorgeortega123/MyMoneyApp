import React from "react";
import { useEffect, useRef } from 'react'
import "./neon.scss";
export default function Neon() {

  return (
    <figure className="main-fig" id="give-love">
    <div class="hole">
        <div class="platform"></div>
    </div>
    <div class="platform-wrap">
        <div class="hearth">
            <div class="left-side"></div>
            <div class="right-side"></div>
        </div>
        <div class="hearth-shadow"></div>
    </div>
</figure>
  );
}
