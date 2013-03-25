// 0, 1, 1, 2, 3, 5, 8, 13, 21
function fibonacci(prevPrev, prev, depth, depthLimit) {
    if (depth >= depthLimit) return;
    
    console.log(prevPrev);
    fibonacci(prev, prevPrev + prev, depth + 1, depthLimit);
}

fibonacci(0, 1, 0, 10);

function itrFib(depthLimit) {
    var prevPrev = 0;
    var prev     = 1;
    var depth    = 0;
    
    while(depth < depthLimit) {
        console.log(prevPrev);
        
        var tmp = prev;
        prev = prevPrev + tmp;
        prevPrev = tmp;
        
        depth++;
    }
}

itrFib(10);