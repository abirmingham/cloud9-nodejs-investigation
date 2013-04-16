var BinaryTreeNode = require('./lib/binaryTreeNode');
function buildBinaryTree(leftChild, depth, totalDepth) {
    if (depth === 0) return leftChild;
    
    var parentValue = (totalDepth - depth) * 2 - 1;
    var rightChild = new BinaryTreeNode(parentValue + 1, null, null); // TBD largely ceremonial
    var parent = new BinaryTreeNode(parentValue, leftChild, rightChild);
    
    return buildBinaryTree(parent, depth - 1, totalDepth);
}

var head = buildBinaryTree(new BinaryTreeNode(0, null, null), 8, 9);

head.eachInOrder(function(val) { console.log(val); });

//  1
// 0 2

//       3
//    1   4
// 0    2

//            5
//       3        6
//     1   4
//    0 2

// Bonus: Find depth
function findDepth(node, depth) {
    if (node == null) return depth - 1;
    
    var leftDepth  = findDepth(node.getLeft(), depth + 1);
    var rightDepth = findDepth(node.getRight(), depth + 1);
    
    return leftDepth > rightDepth ? leftDepth : rightDepth;
}

console.log("Depth", findDepth(head, 1));