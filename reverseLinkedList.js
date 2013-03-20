// Node
var Node = function(val) { this['val'] = val; };
Node.prototype.getVal = function() { return this['val']; };
Node.prototype.setNext = function(n) { this['next'] = n; };
Node.prototype.getNext = function() { return this['next']; };
Node.prototype.printAll = function() {
    console.log(this.getVal());
    if (this.getNext()) this.getNext().printAll();
};


// Define a linked list
var head = new Node(0);
var lastNode = head;

for (var i = 1; i < 100; i++) {
    var node = new Node(i);
    lastNode.setNext(node);
    lastNode = node;
}
head.printAll();

// Reverse it
var reverseLinkedList = function(node) {
    var lastNodeSeen = null;
    var previous = null;
    var current  = node;
    
    while (current) {
        lastNodeSeen = current;
        
        var tmp = current.getNext();
        current.setNext(previous);
        previous = current;
        current = tmp;
    };
    
    return lastNodeSeen;
};

var newHead = reverseLinkedList(head);
head.printAll();
console.log("--");
newHead.printAll();