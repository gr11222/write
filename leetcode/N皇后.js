/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    // var rows = "";
    var board = []
    for (var i = 0; i < n; i++) {
        var row = new Array(n).fill('.')
        board.push(row)
    }
    let res = [];
    function dep(board,row){
        if(row === n){
            let res1 = [];
            for(let i = 0;i<board.length;i++){
                res1.push(board[i].join(''))
            }
            res.push([...res1]);
            return
        }
        for (var i = 0; i < n; i++) {
            if(!vaild(board,row,i,n))
                continue;
            board[row][i] = "Q"
            dep(board,row+1);
            board[row][i] = "."
        }
    }
    dep(board,0)
    return res;
};
function vaild(board,row,col,n){
    for (var i = 0; i < n; i++) {
        if(board[i][col]==='Q')
            return false
    }
    for (var i = row-1,j=col-1; i>=0 && j>=0; i--,j--) {
        if(board[i][j]==='Q')
            return false
    }
    for (var i = row-1,j=col+1; i>=0 && j<=n; i--,j++) {
        if(board[i][j]==='Q')
            return false
    }
    return true
}