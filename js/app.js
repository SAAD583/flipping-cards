
const startContainer = document.querySelector(".start-container");
const remainingTimeDiv = document.querySelector("h2 span");
let firstClick = false

startContainer.addEventListener("click", () => {

//////// every click
  remainingTimeDiv.textContent = 40

  // translate inner window width to left 
  startContainer.style.transform = "translate(" + -window.innerWidth + "px)";

  // reset all cards
  cards.forEach(everyCard => {
    everyCard.className = "card un-flipped-card"
  })
  firstCard = true;
  secondCard = true;
  hasFilppedCard = false;
  unFlippedCards.forEach(everyCard => {
    everyCard.addEventListener("click", flipCard);
  })

  // to avoid click on cards before the container reaches the end of the page bug
  setTimeout(() => {
    cards.forEach(everyCard => {
      everyCard.className = "card un-flipped-card"
    })
  }, 500)

/////////////


//// strat counting down
  let remTimeInterval = setInterval(function remainingTimeFunc() {
    remainingTimeDiv.textContent -= 1

  // when the user loses
    if (remainingTimeDiv.textContent == 0) {

      // reset the flipped cards number to 0
      flippedCardsNumber = 0

      // reset all cards
      cards.forEach(everyCard => {
        everyCard.className = "card un-flipped-card"
      })
      firstCard = true;
      secondCard = true;
      hasFilppedCard = false;
      unFlippedCards.forEach(everyCard => {
        everyCard.addEventListener("click", flipCard);
      })

      // to avoid click on cards before the container reaches the end of the page bug
      setTimeout(() => {
        cards.forEach(everyCard => {
          everyCard.className = "card un-flipped-card"
        })
      }, 500)

      // stop the counting down
      clearInterval(remTimeInterval);

      // edit the h1 tag in the "you won , losed" screen
      document.querySelector(".start-container h1").textContent = `You losed .. Try Again`;
      document.querySelector(".start-container h1").style.color = "red"
      document.querySelector(".start-container h1").style.opacity = 1
      startContainer.style.transform = "translate(" + 0 + "px)";

    }

    // when the flippedCardsNumber reaches 6 (all cards flipped)
    if (flippedCardsNumber === 6) {
      clearInterval(remTimeInterval);
      flippedCardsNumber = 0
    }

  }, 1000);
////


    // on every click you nust shuffle the cards
  for (var i = 0; i < mainCardsContainer.children.length; i++) {
    mainCardsContainer.appendChild(mainCardsContainer.children[Math.floor(Math.random() * i)]);
  }

})




// SHUFFLE CARDS
var mainCardsContainer = document.querySelector('.main-cards-container');
for (var i = 0; i < mainCardsContainer.children.length; i++) {
  // the loop runs for i , not the appendChild
  // We made the last child of the container one of the container's children , and we set the index of
  // the container's children using floor( randomNumber(0-1) * i(0-11) ) 
  mainCardsContainer.appendChild(mainCardsContainer.children[Math.floor(Math.random() * i)]);
}

const cards = document.querySelectorAll(".card");
const flippedCards = document.querySelectorAll(".flipped-card")
const unFlippedCards = document.querySelectorAll(".un-flipped-card")

///// to make like stations to know when we click for the first time and the second
let hasFilppedCard = false;
let firstCard, secondCard;
let flippedCardsNumber = 0

///// every card flip function
function flipCard() {
  this.classList.toggle("filp-class")

///// when we click on the same card twice
  if (firstCard === this) {
    // reset every thing 
    hasFilppedCard = false;
    firstCard = true
    secondCard = true
  }

  else {

/// first click
      if (!hasFilppedCard) {
        hasFilppedCard = true;
        firstCard = this
      }

/// second click
      else {
        hasFilppedCard = false;
        secondCard = this;

//// if the first card date-number === second card data-number
      if (firstCard.dataset.number === secondCard.dataset.number) {
        firstCard.removeEventListener("click", flipCard)
        secondCard.removeEventListener("click", flipCard)

        //// remove the similair cards from the function by removing 
        //// "un-flipped-card" class
        firstCard.classList.add("flipped-card")
        secondCard.classList.add("flipped-card")
        firstCard.classList.remove("un-flipped-card");
        secondCard.classList.remove("un-flipped-card")

        // increase the flippedCardsNumber by 1
        flippedCardsNumber++

///// if all cards are truely flipped
        if (flippedCardsNumber === 6) {

          /////// to avoid quick flipping
          setTimeout(() => {
            document.querySelector(".start-container h1").textContent = `You Won !! .. Play Again`;
            document.querySelector(".start-container h1").style.color = "green"
            document.querySelector(".start-container h1").style.opacity = 1
            startContainer.style.transform = "translate(" + 0 + "px)";

            // reset all cards
            cards.forEach(everyCard => {
              everyCard.className = "card un-flipped-card"
            })
            firstCard = true;
            secondCard = true;
            hasFilppedCard = false;
            unFlippedCards.forEach(everyCard => {
              everyCard.addEventListener("click", flipCard);
            })
          }, 500)

          // to avoid click on cards before the container reaches the end of the page bug
          setTimeout(() => {
            cards.forEach(v => {
              v.className = "card un-flipped-card"
            })
          }, 500)

          ///////
        }


      }

////// when the two cards are different
      else {
        
        // remove flip function to different cards
        unFlippedCards.forEach(v => {
          v.removeEventListener("click", flipCard)
        })

        setTimeout(function () {
        // flip different cards
          firstCard.className = "card un-flipped-card"
          secondCard.className = "card un-flipped-card"

        // add flip function to different cards
          unFlippedCards.forEach((v) => {
            if (!v.classList.contains("flipped-card")) {
              v.addEventListener("click", flipCard)
            }
          })

////// reset every thing to restart the function when the two cards are different
          hasFilppedCard = false;
          firstCard = true;
          secondCard = true;

        }, 1000)
      }

    }

  }
}

// add click function to cards with "un-flipped-card" class
unFlippedCards.forEach(v => {
  v.addEventListener("click", flipCard);
})
