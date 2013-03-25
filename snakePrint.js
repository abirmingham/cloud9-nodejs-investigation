// Given a 2D array, write a function to print it out in a snake pattern

function snakePrint(grid, y, x, visited) {
    if (x < 0 || x >= grid[0].length) return;
    if (y < 0 || y >= grid.length) return;
    
    console.log(grid[y][x]);
    
    if (! visited[y]) visited[y] = [];
    visited[y][x] = true;
    
    var destinations = [[y, x + 1], [y + 1, x], [y, x - 1], [y - 1, x]];

    for (var i = 0; i < destinations.length; i++) {
        var d = destinations[i];
        
        if (! visited[d[0]] || ! visited[d[0]][d[1]]) {
            snakePrint(grid, d[0], d[1], visited);
        }
    }
}

snakePrint([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
], 0, 0, []); // 1,2,3,6,9,8,7,4,5

snakePrint([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12] // 1,2,3,4,8,12,11,10,9,5,6,7
], 0, 0, []);

