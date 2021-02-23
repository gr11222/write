/**
 * @param {character[][]} grid
 * @return {number}
 */

 // DFS
var numIslands = function(grid) {
	if(!grid.length||!grid[0].length){
		return 0
	}
	let cols = grid.length;
	let rows = grid[0].length;
	let sum = 0;
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if(grid[i][j] == 1){
				grid[i][j] == 0;
				sum++;
				helper(grid,i,j)
			}
		}
	}
	return sum
};

function helper(grid,i,j){
	if(i<0||j<0||i>=grid.length||j>=grid[0].length||grid[i][j] == 0)
		return
	if(grid[i][j] == 1){
		grid[i][j] = 0;
	}
	helper(grid,i,j-1);
	helper(grid,i-1,j);
	helper(grid,i+1,j);
	helper(grid,i,j+1);
}

// BFS
var numIslands = function(grid) {
	if(!grid.length||!grid[0].length){
		return 0
	}
	let cols = grid.length;
	let rows = grid[0].length;
	let sum = 0;
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if(grid[i][j] == 1){
				sum++;
				helper(grid,i,j)
			}
		}
	}
	return sum
};

function helper(grid,i,j){
	let stack = [];
	stack.push([i,j]);
	while (stack.length) {
		let item = stack.shift();
		let x = item[0];
		let y = item[1];
		if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] != '1') {
			continue;
		}else{
			grid[x][y] = '0'
  			stack.push([x-1, y])
  			stack.push([x, y-1])
  			stack.push([x+1, y])
  			stack.push([x, y+1])
		}
	}
}

