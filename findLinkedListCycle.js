var Node = require('./lib/linkedListNode');

// Define a linked list with a cycle
var head = new Node(0);
var lastNode = head;

var cycleTarget = null;

for (var i = 1; i < 100; i++) {
    var node = new Node(i);
    lastNode.setNext(i == 75 ? cycleTarget : node);
    lastNode = node;
    
    if (i == 50) cycleTarget = node;
}

var fastPointer = head.getNext();
var slowPointer = head;

for (var i = 1; i < 1000; i++) {
    if (slowPointer === fastPointer) {
        console.log("Cycle found at " + (i/2));
        break;
    }
    else {
        fastPointer = fastPointer.getNext();
        if (i % 2 == 0) slowPointer = slowPointer.getNext();
    }
}