var Node = module.exports = function(val) { this['val'] = val; };
Node.prototype.getVal = function() { return this['val']; };
Node.prototype.setNext = function(n) { this['next'] = n; };
Node.prototype.getNext = function() { return this['next']; };
Node.prototype.setPrev = function(n) { this['prev'] = n; };
Node.prototype.getPrev = function() { return this['prev']; };
Node.prototype.printAll = function() {
    console.log(this.getVal());
    if (this.getNext()) this.getNext().printAll();
};
Node.prototype.printAllReverse = function() {
    console.log(this.getVal());
    if (this.getPrev()) this.getPrev().printAllReverse();
};