var Node = require('./lib/linkedListNode');

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