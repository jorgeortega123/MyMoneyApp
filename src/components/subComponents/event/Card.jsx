import React from "react";
import "./card.scss";
import { AnimatePresence, motion } from "framer-motion";
export default function Card() {
  //->Made it by 1vanbrav0
  //Variables
  let mobile_media_query = window.matchMedia("(max-width: 400px)");
  let tablet_media_query = window.matchMedia(
    "(min-width: 400px) and (max-width: 600px)"
  );
  const notes = document.querySelectorAll(".js-note");

  //-> Function that resets the size of the notes.
  function recize_notes() {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].classList.contains("active")) {
        notes[i].classList.remove("active");
        gsap.set(notes[i], {
          height: "30%",
          clearProps: "all",
        });
      }
    }
  }

  //-> Main function that enables all the notes.
  function notes_ready() {
    gsap.to(".js-envelop-content", {
      height: "110%",
      duration: 1.0,
    });

    for (let i = 0; i < notes.length; i++) {
      notes[i].addEventListener("click", function () {
        if (mobile_media_query.matches) {
          if (this.classList.contains("active")) {
            this.classList.remove("active");
            gsap.set(this, {
              height: "40%",
              clearProps: "all",
            });
          } else {
            for (let i = 0; i < notes.length; i++) {
              if (notes[i].classList.contains("active")) {
                notes[i].classList.remove("active");
                gsap.set(notes[i], {
                  height: "40%",
                  clearProps: "all",
                });
              }
            }
            this.classList.add("active");
            gsap.set(this, {
              height: 125 + 40 * i + "%",
            });
          }
        } else if (tablet_media_query.matches) {
          if (this.classList.contains("active")) {
            this.classList.remove("active");
            gsap.set(this, {
              height: "40%",
              clearProps: "all",
            });
          } else {
            for (let i = 0; i < notes.length; i++) {
              if (notes[i].classList.contains("active")) {
                notes[i].classList.remove("active");
                gsap.set(notes[i], {
                  height: "40%",
                  clearProps: "all",
                });
              }
            }
            this.classList.add("active");
            gsap.set(this, {
              height: 80 + 21 * i + "%",
            });
          }
        } else {
          if (this.classList.contains("active")) {
            this.classList.remove("active");
            gsap.set(this, {
              height: "40%",
              clearProps: "all",
            });
          } else {
            for (let i = 0; i < notes.length; i++) {
              if (notes[i].classList.contains("active")) {
                notes[i].classList.remove("active");
                gsap.set(notes[i], {
                  height: "40%",
                  clearProps: "all",
                });
              }
            }
            this.classList.add("active");
            gsap.set(this, {
              height: 70 + 20 * i + "%",
            });
          }
        }
      });
    }
  }

  //-> Function that set up the up paper of the envelope.
  function set_up_paper() {
    var arr = [0, 0, 100, 0, 50, 61];
    gsap.set(".js-up-paper", {
      bottom: "97%",
      rotation: 180,
      zIndex: 200,
      clipPath:
        "polygon(" +
        arr[0] +
        "%" +
        arr[1] +
        "%," +
        arr[2] +
        "%" +
        arr[3] +
        "%," +
        arr[4] +
        "%" +
        arr[5] +
        "%)",
      onComplete: notes_ready,
    });
  }

  //-> Function that starts the up paper transition.
  function envelop_transition() {
    gsap.to(".js-up-paper", {
      bottom: "1%",
      duration: 0.5,
      onComplete: set_up_paper,
    });
    document
      .querySelector(".js-up-paper")
      .removeEventListener("click", envelop_transition);
    document.querySelector(".js-up-paper").classList.remove("cursor");
  }

  //-> Function that allows cut the sticker.
  console.log(document.querySelector(".js-s-ticker"));
  //document.querySelector(".js-s-ticker").addEventListener("click", sticker);

  function sticker() {
    console.log("ola");
    gsap.set(".js-s-ticker", { width: "20%", left: "-80%" });
    document.body.classList.remove("scissors");
    document.querySelector(".js-s-ticker").addEventListener("click", sticker);
    document
      .querySelector(".js-s-ticker")
      .removeEventListener("click", sticker);
    document
      .querySelector(".js-up-paper")
      .addEventListener("click", envelop_transition);
    document.querySelector(".js-up-paper").classList.add("cursor");
  }

  window.onresize = function (event) {
    recize_notes();
  };
  return (<motion.div
        initial={{ opacity: 0,  y:200 }}
        animate={{ opacity: 1, x: 0, y:0 }}
        transition={{
          duration: 10,
        }}
        className="overflow-hidden bg-black  "
      >
    <div className="scissors w-auto">
      
      <div class="envelop">
        <div class="envelop__front-paper"></div>
        <div class="envelop__back-paper"></div>
        <div class="envelop__up-paper js-up-paper"></div>
        <div
          onClick={() => {
            sticker("S");
          }}
          class="envelop__sticker js-s-ticker"
          id="js-s-ticker"
        ></div>
        <div class="envelop__false-sticker"></div>
        <div class="envelop__content js-envelop-content">
          <div class="love-notes">
            <div class="note js-note ">
              <div class="note__text ">
                <p>
                  Hola amor, te quiero dar las gracias por todo, por las
                  alegrías, por las risas, por los lindos momentos pero, también
                  por los malos, porque aunque haya malos momentos...
                </p>
              </div>
            </div>
            <div class="note js-note">
              <div class="note__text">
                <p>
                  quiero pasarlos contigo, luchar y superarlos juntos. La verdad
                  eres muy importante para mi, amo lo que tenemos juntos y sé
                  que podemos mejorar y mantenerlo si los dos queremos y créeme
                  que yo quiero.
                </p>
              </div>
            </div>
            <div class="note js-note">
              <div class="note__text">
                <p>
                  En verdad te amo y se que podemos lograrlo, y lo intentare
                  hasta que ya no este en mis manos, porque no estoy contigo por
                  necesidad ni por superficialidad, estoy contigo por elección.
                </p>
                <p>Te amo mensa &hearts;.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></motion.div>
  );
}
