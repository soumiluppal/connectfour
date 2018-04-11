class Connect4 {
	constructor(selector) {
		this.ROWS = 6;
		this.COLUMNS = 7;
		this.player = 'red';
		this.selector = selector;
		this.over = false;
		this.createGrid();
		this.setupEventListeners();
	}
	createGrid() {
		const $board = $(this.selector);
		console.log($board);
		for(let row = 0; row < this.ROWS; row++) {
			const $row = $('<div>')
				.addClass('row');
			for(let col = 0; col < this.COLUMNS; col++) {
				const $col = $('<div>')
					.addClass('col empty')
					.attr('data-col', col)
					.attr('data-row', row);
				$row.append($col);
			}
			$board.append($row);
		}
		console.log('here: ' + $board.html());
	}

	setupEventListeners() {
		const $board = $(this.selector);
		const that = this;

		function findLastEmptyCell(col) {
			const cells = $(`.col[data-col = '${col}']`);
			for(let i = cells.length - 1; i >= 0; i--) {
				const $cell = $(cells[i]);
				if($cell.hasClass('empty')) {
					return $cell;
				}
			}
			return null;
		}

		$board.on('mouseenter', '.col.empty', function() {
			if(that.over) return;
			const col = $(this).data('col');
			const $lastEmptyCell = findLastEmptyCell(col);
			$lastEmptyCell.addClass(`next-${that.player}`);
		});

		$board.on('mouseleave', '.col', function() {
			$('.col').removeClass(`next-${that.player}`);
		});

		$board.on('click', '.col.empty', function() {
			const col = $(this).data('col');
			const row = $(this).data('row');
			const $lastEmptyCell = findLastEmptyCell(col);
			$lastEmptyCell.removeClass(`empty next-${that.player}`);
			$lastEmptyCell.removeClass('empty');
			$lastEmptyCell.addClass(that.player);
			$lastEmptyCell.data('player', that.player);

			const winner = that.winnerCheck($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
			if(winner) {
				that.over = true;
				alert(`Game Over! Player ${that.player} has won!`);
				$('.col.empty').removeClass('empty');
				return;
			}

			that.player = (that.player === 'red') ? 'yellow' : 'red';
			document.getElementById('which').style.backgroundColor = that.player;
			console.log('here: ' + $board.html());
			$(this).trigger('mouseenter')
		});
	}

	winnerCheck(row, col) {
		const that = this;

		function $getCell(row, col) {
			return $(`.col[data-row='${row}'][data-col='${col}']`);
		}

		function checkDir(dir) {
			let total = 0;
			let i = row + dir.i;
			let j = col + dir.j;
			let $next = $getCell(i, j);

			while(i >= 0 && i < that.ROWS && j >= 0 && j < that.COLUMNS && $next.data('player') === that.player) {
				total++;
				i += dir.i;
				j += dir.j;
				$next = $getCell(i, j);
			}
			return total;
		}

		function check(a, b) {
			const total = 1 + checkDir(a) + checkDir(b);
			if(total >= 4) {
				return that.player;
			}
			else {
				return null;
			}
		}

		function diagonalbltotr() {
			return check({i: 1, j: -1}, {i: 1, j: 1});
		}

		function diagonaltltobr() {
			return check({i: 1, j: 1}, {i: -1, j: -1});
		}

		function vertical() {
			return check({i: -1, j: 0}, {i: 1, j: 0});
		}

		function horizontal() {
			return check({i: 0, j: -1}, {i: 0, j: 1});
		}
		return vertical() || horizontal() || diagonalbltotr() || diagonaltltobr();
	}

}