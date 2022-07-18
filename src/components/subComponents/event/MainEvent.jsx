import React from "react";
import "./style.css";
export default function MainEvent() {
  const spans = document.querySelectorAll('.letterPerLetter span');

spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});
 setTimeout(() => {
  document.getElementById("mainBack").classList.add("black-enterrazi")
  document.getElementById("mainBack").classList.remove("normal-back")
 }, 12000);
  return (
    <div id="mainBack" className="h-screen w-screen background normal-back">
      <div className="h-full w-full flex items-center justify-center">
        <div className="letterPerLetter font-mono">
          <span>D</span>
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
        </div>
      </div>
    </div>
  );
}
