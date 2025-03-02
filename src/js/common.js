"use strict";
import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";

const btnBurger = document.querySelector(".js-burger");
const dropMenu = document.querySelector(".js-menu");

//---toggle burger
btnBurger.addEventListener("click", function () {
  btnBurger.classList.toggle("active");
  dropMenu.classList.toggle("active");
  document.body.classList.toggle("open-menu");
  console.log('test')
});

//---click outside
document.addEventListener("click", function (event) {
  const clickInside = event.composedPath().includes(dropMenu);
  const clickInsideBtn = event.composedPath().includes(btnBurger);
  if (!clickInside && !dropMenu.contains(event.target) && !clickInsideBtn) {
    dropMenu.classList.remove("active");
    btnBurger.classList.remove("active");
    document.body.classList.remove("open-menu");
    console.log('close')
  }
});


//----scroll top
document.addEventListener("scroll", handleScroll);
let scrollToTopBtn = document.querySelector(".btn-up");

function handleScroll() {
  let scrollableHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let srollRatio = 0.3;

  if (document.documentElement.scrollTop / scrollableHeight > srollRatio) {
    //show button
    scrollToTopBtn.style.display = "flex";
  } else {
    //hide button
    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


//---add card

const btnMore = document.querySelector(".js-btn-more");
const itemsWrap = document.querySelector(".cards__list");

const queryItems = (start, limit) => {
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        itemsWrap.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="card">
                        <div class="card__img">
                            <img src="./public/img/cards/item${element.id}.webp" alt="..." loading="lazy">
                        </div>
                        <div class="card__description">
                            <div class="card__name">no name</div>
                            <div class="card__subname">${element.title}</div>
                            <div class="card__text">${element.body}</div>
                            <div class="card__post-name">
                                Posted by <span>Eugenia</span>, on July 24, 2019
                            </div>
                            <div class="card__more">
                                <a href="#" target="_blank">Continue reading</a>
                            </div>
                        </div>
                    </div>
				`
        );
      });
      animCard();
    });
};
queryItems(0, 10);
btnMore.addEventListener("click", function () {
  const items = itemsWrap.querySelectorAll(".card");
  let btn = this;
  if (items.length === 30) return;
  if (items.length === 25) btn.classList.add("disabled");
  queryItems(items.length, 5);
});

//--- gsap

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

tl.fromTo(
  ".main-banner__title",
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1,
  },
  0.4
)
  .fromTo(
    ".main-banner__subtitle",
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
    },
    1
  )
  .fromTo(
    ".main-banner__btn",
    {
      scale: 0.2,
      opacity: 0,
    },
    {
      opacity: 1,
      scale: 1,
    },
    1.5
  )
  .fromTo(
    ".header-nav",
    {
      scale: 0.2,
      opacity: 0,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      repeat: 0,
    },
    0.5
  );
gsap.from(".main-banner__img img", {
  scrollTrigger: {
    trigger: ".main-banner",
    markers: false,
    start: "top 10%",
    end: "top center",
    scrub: 2,
  },
  scale: 1.2,
  transformOrigin: "center center",
  ease: "none",
  stagger: 1,
  direction: 1,
});

const animCard = () => {
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".cards__list",
    markers: false,
    start: "top 90%",
    end: "top 10%",
    scrub: 2,
  },
  scale: 0.8,
  opacity: 0.5,
  transformOrigin: "center center",
  ease: "none",
  stagger: 1,
  duration: 5,
});
}