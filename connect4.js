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
		//console.log('here: ' + $board.html());
	}

	setupEventListeners() {
		var color = this.getParameterByName('color');
		const $board = $(this.selector);
		const that = this;
		var socket = io();
		var x;

		if(that.player === color) {
			document.getElementById("time").innerHTML = "30";
			x = setInterval(function() {
			var distance = document.getElementById("time").innerHTML;
			var t = parseInt(distance) - 1;
    		document.getElementById("time").innerHTML = t.toString();
    		if (distance < 1) {
        		clearInterval(x);
        		document.getElementById("time").innerHTML = "Wait for your turn";
        		if(color == that.player) {
			var colt = 0;
			var $lastEmptyCellt = findLastEmptyCell(colt);
			while(colt < 7) {
				$lastEmptyCellt = findLastEmptyCell(colt);
				if($lastEmptyCellt == null) {
					console.log("WHAT");
					colt++;
				}
				else {
					break;
				}
			}
			$lastEmptyCellt.removeClass(`empty next-${that.player}`);
			$lastEmptyCellt.removeClass('empty');
			$lastEmptyCellt.addClass(that.player);
			$lastEmptyCellt.data('player', that.player);
			that.sendMsg(colt, socket);
			const winner = that.winnerCheck($lastEmptyCellt.data('row'), $lastEmptyCellt.data('col'));
			if(winner) {
				that.over = true;
				alert(`Game Over! Player ${that.getParameterByName('user1', window.location.href)} has won!`);
				$('.col.empty').removeClass('empty');
				return;
			}

			that.player = (that.player === 'red') ? 'yellow' : 'red';
			document.getElementById('which').style.backgroundColor = that.player;
			
			//console.log('here: ' + $board.html());
			$(this).trigger('mouseenter')
    		}
    	}
		}, 1000);
		}

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
			if(color == that.player) {
			const col = $(this).data('col');
			const $lastEmptyCell = findLastEmptyCell(col);
			$lastEmptyCell.addClass(`next-${that.player}`);
		}
		});

		$board.on('mouseleave', '.col', function() {
			if(color == that.player) {
			$('.col').removeClass(`next-${that.player}`);
		}
		});

		$board.on('click', '.col.empty', function() {
			if(color == that.player) {
			const col = $(this).data('col');
			const row = $(this).data('row');
			const $lastEmptyCell = findLastEmptyCell(col);
			$lastEmptyCell.removeClass(`empty next-${that.player}`);
			$lastEmptyCell.removeClass('empty');
			$lastEmptyCell.addClass(that.player);
			$lastEmptyCell.data('player', that.player);
			that.sendMsg(col, socket);
			clearInterval(x);
        	document.getElementById("time").innerHTML = "Wait for your turn";
			const winner = that.winnerCheck($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
			if(winner) {
				that.over = true;
				clearInterval(x);
				document.getElementById("time").innerHTML = that.getParameterByName('user1', window.location.href) + " has won!";
				$('.col.empty').removeClass('empty');
				return;
			}
			else {
				var colt = 0;
				var $lastEmptyCellt = findLastEmptyCell(colt);
				while(colt < 7) {
				$lastEmptyCellt = findLastEmptyCell(colt);
				if($lastEmptyCellt == null) {
					console.log("WHAT");
					colt++;
				}
				else {
					break;
				}
				}
				if(colt > 6) {
					that.over = true;
					document.getElementById("time").innerHTML = "It's a tie!";
					$('.col.empty').removeClass('empty');
					return;
				}
			}

			that.player = (that.player === 'red') ? 'yellow' : 'red';
			document.getElementById('which').style.backgroundColor = that.player;
			
			//console.log('here: ' + $board.html());
			$(this).trigger('mouseenter')
		}
		});
		
		socket.on('token,' + this.getParameterByName('user1', window.location.href), function(msg){
      		console.log("here: " + msg);
      		const col = msg;
      		const $lastEmptyCell = findLastEmptyCell(col);
      		$lastEmptyCell.removeClass(`empty next-${that.player}`);
			$lastEmptyCell.removeClass('empty');
			$lastEmptyCell.addClass(that.player);
			$lastEmptyCell.data('player', that.player);
			const winner = that.winnerCheck($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
			if(winner) {
				that.over = true;
				clearInterval(x);
				document.getElementById("time").innerHTML = that.getParameterByName('user2', window.location.href) + " has won!";
				$('.col.empty').removeClass('empty');
				return;
			}
			else {
				var colt = 0;
				var $lastEmptyCellt = findLastEmptyCell(colt);
				while(colt < 7) {
				$lastEmptyCellt = findLastEmptyCell(colt);
				if($lastEmptyCellt == null) {
					console.log("WHAT");
					colt++;
				}
				else {
					break;
				}
				}
				if(colt > 6) {
					that.over = true;
					document.getElementById("time").innerHTML = "It's a tie!";
					$('.col.empty').removeClass('empty');
					return;
				}
			}

			that.player = (that.player === 'red') ? 'yellow' : 'red';
			document.getElementById('which').style.backgroundColor = that.player;
			
			//console.log('here: ' + $board.html());
			$(this).trigger('mouseenter')

			document.getElementById("time").innerHTML = "30";
			x = setInterval(function() {
			var distance = document.getElementById("time").innerHTML;
			var t = parseInt(distance) - 1;
    		document.getElementById("time").innerHTML = t.toString();
    		if (distance < 1) {
        		clearInterval(x);
        		document.getElementById("time").innerHTML = "Wait for your turn";
        		if(color == that.player) {
			var colt = 0;
			var $lastEmptyCellt = findLastEmptyCell(colt);
			while(colt < 7) {
				$lastEmptyCellt = findLastEmptyCell(colt);
				if($lastEmptyCellt == null) {
					console.log("WHAT");
					colt++;
				}
				else {
					break;
				}
			}
			$lastEmptyCellt.removeClass(`empty next-${that.player}`);
			$lastEmptyCellt.removeClass('empty');
			$lastEmptyCellt.addClass(that.player);
			$lastEmptyCellt.data('player', that.player);
			that.sendMsg(colt, socket);
			const winner = that.winnerCheck($lastEmptyCellt.data('row'), $lastEmptyCellt.data('col'));
			if(winner) {
				that.over = true;
				clearInterval(x);
				document.getElementById("time").innerHTML = that.getParameterByName('user1', window.location.href) + " has won!"
				$('.col.empty').removeClass('empty');
				return;
			}

			that.player = (that.player === 'red') ? 'yellow' : 'red';
			document.getElementById('which').style.backgroundColor = that.player;
			
			//console.log('here: ' + $board.html());
			$(this).trigger('mouseenter')
    		}
    	}
		}, 1000);
		});

		socket.on('disconnected' + getParameterByName("user1", window.location.href), function(disconnected_user) {
			//const winner = that.winnerCheck($lastEmptyCell.data('row'), $lastEmptyCell.data('col'));
			if(!that.over) {
				that.over = true;
				clearInterval(x);
				document.getElementById("time").innerHTML = that.getParameterByName('user1', window.location.href) + " has won!"
				$("#chatlog").append(`<p class="username" style="color: grey"><i>${disconnected_user} has disconnected </i></p>`);
				document.getElementById("message").readOnly = true;
				document.getElementById("send").disabled = true;
				$('.col.empty').removeClass('empty');
				return;
			}
		})
    	
	}

  	sendMsg(col, socket) {
  		var url = window.location.href;
  		var user2 = this.getParameterByName('user2', url);
      	socket.emit('token', col + ',' + user2);
      	return false;
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

	getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

}