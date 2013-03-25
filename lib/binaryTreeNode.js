var BinaryTreeNode = module.exports = function(val, leftChild, rightChild) {
    this['val'] = val;
    this['left'] = leftChild;
    this['right'] = rightChild;
};
BinaryTreeNode.prototype.getVal   = function() { return this['val'];   };
BinaryTreeNode.prototype.getLeft  = function() { return this['left'];  };
BinaryTreeNode.prototype.getRight = function() { return this['right']; };
BinaryTreeNode.prototype.eachInOrder = function(callback) {
    if (this['left']) this['left'].eachInOrder(callback);
    callback(this['val']);
    if (this['right']) this['right'].eachInOrder(callback);
};