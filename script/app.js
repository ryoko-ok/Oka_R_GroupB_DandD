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

//-----------------------------------------------------------------
	//called as the draggable enters a droppable 
  //needs to return false to make droppable area valid
  function dragEnter(event) {

    var drop = this;

    //set the drop effect for this zone
    event.dataTransfer.dropEffect = 'copy';
    $(drop).addClass('drop-active');

    event.preventDefault();
    event.stopPropagation();

  }
  //called continually while the draggable is over a droppable 
  //needs to return false to make droppable area valid
  function dragOver(event) {
    var drop = this;

    //set the drop effect for this zone
    event.dataTransfer.dropEffect = 'copy';
    $(drop).addClass('drop-active');

    event.preventDefault();
    event.stopPropagation();
  }

  //called when the draggable was inside a droppable but then left
  function dragLeave(event) {
    var drop = this;
    $(drop).removeClass('drop-active');
  }

  //called continually as the draggable is dragged
  function drag(event) {

  }

  //called when the draggable has been released (either on droppable or not)
  //may be called on invalid or valid drop
  function dragEnd(event) {

    var drag = this;
    $(drag).removeClass('drag-active');

  }


  //-----------------------------------------------------------------


	//add event handling here -> how is the user going to use our app?
	//what triggers do we need?

	// on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the fuction and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[0]);
})();
