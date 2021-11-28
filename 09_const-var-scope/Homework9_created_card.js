const startButton = document.querySelector('.header-form__button');
let map = document.querySelector('.memory-game');
const namesOfImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

function createCard(nameCard) {
  const element = document.createElement('div');
  element.setAttribute("class", "memory-card");
  element.setAttribute("data-framework", nameCard);

  const frontFace = document.createElement('img');
  frontFace.setAttribute("class", "front-face");
  frontFace.setAttribute("src", `img/${nameCard}.svg`);
  frontFace.setAttribute("alt", nameCard);
  element.append(frontFace);

  const backFace = document.createElement('img');
  backFace.setAttribute("class", "back-face");
  backFace.setAttribute("src", "img/js-badge.svg");
  backFace.setAttribute("alt", "backFace");
  element.append(backFace);

  return element;
}

function shuffleAndSplit(array, num) {
    let i = array.length;
    let j = 0;
    let temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array.slice(0, num);
}

function createMap() {
  const rowsValue = document.getElementById("rows").value;
  const columnsValue = document.getElementById("columns").value;

  if (!rowsValue || !columnsValue) {
    return;
  }
  startButton.disabled="disabled"

  const amount = rowsValue * columnsValue / 2;
  const names = shuffleAndSplit(namesOfImages, amount);
  const sample = shuffleAndSplit([...names, ...names]);

  for (let i = 0; i < sample.length; i++) {
    map.append(createCard(sample[i]));
  }


  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
       firstCard = this;
       return;
     }

     secondCard = this;

     checkForMatch();

     let isGameWon = true;
     cards.forEach(e => {
       isGameWon = isGameWon && e.classList.contains('flip');
     });
     if (isGameWon) {
       setTimeout(() => {
         if (confirm('Сыграть еще раз?')) {
           document.location.reload();
         }
       }, 1000);
     }
   }

   function checkForMatch() {
     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

     isMatch ? disableCards() : unflipCards();
   }

   function disableCards() {
     firstCard.removeEventListener('click', flipCard);
     secondCard.removeEventListener('click', flipCard);

     resetBoard();
   }

   function unflipCards() {
     lockBoard = true;
     setTimeout(() => {
       firstCard.classList.remove('flip');
       secondCard.classList.remove('flip');

       resetBoard();
     }, 1500);

   }




   function resetBoard() {
     [hasFlippedCard, lockBoard] = [false, false];
     [firstCard, secondCard] = [null, null];
   }

   cards.forEach(card => card.addEventListener('click', flipCard));


}



startButton.addEventListener('click', createMap);
