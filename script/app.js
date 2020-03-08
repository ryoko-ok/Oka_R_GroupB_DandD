(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				puzzlePieces = document. querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board');

 // store the image names here
  const pieceNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

// functions go here => what we want to have happen when our triggers fire
	function changeImageSet() {
		// change all athe image elements on the page -> draggable image sources
		// change the image elements on the left to match the selected puzzle
		pieceNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
			puzzlePieces[index].id = `${piece + this.dataset.puzzleref}`;

		// refresh idea_1
		//let element = document.getElementById("puzzle-board");
			//while (element.firstChild) {
  			//element.removeChild(element.firstChild); }

		});


		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		//debugger;
	}

	function allowDrag(event) {
		console.log('started draggin an image');

		event.dataTransfer.setData("text/plain", this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragged over a drop zone');
	}

	function allowDrop(event) {
		// event.preventDefault();
		console.log('dropped on a drop zone');

		//go and get the dragged element's ID from the data transfer object
		let currentImage = event.dataTransfer.getData("text/plain");

		// add that image to whatever drop zone we're dropping our image on
		event.target.appendChild(document.querySelector(`#${currentImage}`));
	}

	// refresh_idea_2
	//function getRectArea(width, height) {
		//if (width > 0 && height > 0) {
  	  	//return "width * height"; }
 	 	//return 0; }

	//add event handling here -> how is the user going to use our app?
	//what triggers do we need?

	// refresh_idea_3
	//function addAllLiteners(){
		//let dropPuzzle = document.querySelectorAll('.puzzle-pieces img');
		//console.log("currentImage = ", currentImage);
		//event.target.appendchild(document.querySelector('#${currentImage}'));}



	// on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));
	window.location.replace("puzzle-board");


	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the fuction and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[0]);
})();
