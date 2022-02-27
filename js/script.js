"use strict";
const d = document;
d.addEventListener("DOMContentLoaded", () => {
  const _grid = d.getElementById("grid");
  const _scoreDisplay = d.getElementById("score");
  const width = 8;
  const _Asquares = [];
  let score = 0;

  const _AcandyColors = [
    "url(assets/red.png)",
    "url(assets/yellow.png)",
    "url(assets/orange.png)",
    "url(assets/purple.png)",
    "url(assets/green.png)",
    "url(assets/blue.png)",
  ];
  //create your board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * _AcandyColors.length);
      square.style.backgroundImage = _AcandyColors[randomColor];
      _grid.appendChild(square);
      _Asquares.push(square);
    }
  }
  createBoard();

  // Dragging the Candy
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  _Asquares.forEach((square) =>
    square.addEventListener("dragstart", dragStart)
  );
  _Asquares.forEach((square) => square.addEventListener("dragend", dragEnd));
  _Asquares.forEach((square) => square.addEventListener("dragover", dragOver));
  _Asquares.forEach((square) =>
    square.addEventListener("dragenter", dragEnter)
  );
  _Asquares.forEach((square) =>
    square.addEventListener("drageleave", dragLeave)
  );
  _Asquares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    // this.style.backgroundImage = ''
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = "";
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    _Asquares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    //What is a valid move?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      _Asquares[squareIdBeingReplaced].style.backgroundImage =
        colorBeingReplaced;
      _Asquares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else
      _Asquares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }

  //drop candies once some have been cleared
  function moveIntoSquareBelow() {
    for (let i = 0; i < 55; i++) {
      if (_Asquares[i + width].style.backgroundImage === "") {
        _Asquares[i + width].style.backgroundImage =
          _Asquares[i].style.backgroundImage;
        _Asquares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && _Asquares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * _AcandyColors.length);
          _Asquares[i].style.backgroundImage = _AcandyColors[randomColor];
        }
      }
    }
  }

  ///Checking for Matches
  //for row of Four
  function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = _Asquares[i].style.backgroundImage;
      const isBlank = _Asquares[i].style.backgroundImage === "";

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            _Asquares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        _scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          _Asquares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForFour();

  //for column of Four
  function checkColumnForFour() {
    for (let i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = _Asquares[i].style.backgroundImage;
      const isBlank = _Asquares[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            _Asquares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        _scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          _Asquares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForFour();

  //for row of Three
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = _Asquares[i].style.backgroundImage;
      const isBlank = _Asquares[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            _Asquares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        _scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          _Asquares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForThree();

  //for column of Three
  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = _Asquares[i].style.backgroundImage;
      const isBlank = _Asquares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            _Asquares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        _scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          _Asquares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForThree();

  // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
  }, 100);
});
