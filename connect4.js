class Connect4 {
	constructor(selector) {
		this.ROWS = 6;
		this.COLUMNS = 7;
		this.selector = selector;
		this.createGrid();
	}
	createGrid() {
		const $board = $(this.selector);
		console.log($board);
		for(let row = 0; row < this.ROWS; row++) {
			const $row = $('<div>')
				.addClass('row');
			for(let col = 0; col < this.COLUMNS; col++) {
				const $col = $('<div>')
					.addClass('col empty');
				$row.append($col);
			}
			$board.append($row);
		}
		console.log($board.html());
	}

}