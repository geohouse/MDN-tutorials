const aliceTumbling = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const aliceTiming = { duration: 2000, iterations: 1, fill: "forwards" };

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// const animationProgress = alice1.animate(aliceTumbling, aliceTiming).finished;

// animationProgress
//   .then(() => {
//     return alice2.animate(aliceTumbling, aliceTiming).finished;
//   })
//   .then(() => {
//     alice3.animate(aliceTumbling, aliceTiming);
//   });

async function animateAlice() {
  const firstAnimate = await alice1.animate(aliceTumbling, aliceTiming)
    .finished;
  const secondAnimate = await alice2.animate(aliceTumbling, aliceTiming)
    .finished;
  const thirdAnimate = alice3.animate(aliceTumbling, aliceTiming);
}

animateAlice();

// const animateFinishedPromise = alice1.animate(aliceTumbling, aliceTiming).finished

// animateFinishedPromise
//   .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
//   .then(() => alice3.animate(aliceTumbling, aliceTiming));

// Promise.all(alice1.getAnimations().map((animation) => animation.finished)).then(
//   () => alice1.remove()
// );
