// TODO this is all wrong. This is like... LeastRecentlyInserted or something
// TODO tests over console asserts
// TODO stale values?
// TODO google how these are actually implemented?

var DoubleLinkedListNode = require('./doubleLinkedListNode');

function allegedlyExpensiveOperation() {
    return Math.random(1000) + 1;
};

var LruCache = module.exports = function(sizeLimit) {
    this.sizeLimit = sizeLimit;
    this.size      = 0;
    this.cache     = {};

    this.mruNode = null;
    this.lruNode = null;
};
LruCache.prototype.get = function(key) {
    if (! this.cache.hasOwnProperty(key)) {
        console.log("Cached value not found", key);
        var newNode = new DoubleLinkedListNode(key);
        
        if (this.size === 0) {
            console.log("Initializing");
            this.mruNode = newNode;
            this.lruNode = newNode;
            this.size = 1;
        }
        else {
            // Set mru
            var mru = this.mruNode;
            mru.setPrev(newNode);
            newNode.setNext(mru);
            this.mruNode = newNode;
            
            if (this.size + 1 > this.sizeLimit) {
                console.log("Full cache, discarding LRU", this.lruNode.getVal());
                
                // Set lru
                var lru = this.lruNode;
                var newLru = lru.getPrev();
                newLru.setNext(null);
                
                this.lruNode = newLru;
                delete this.cache[lru.getVal()];
            }
            else {
                this.size++;
            }
        }

        this.cache[key] = allegedlyExpensiveOperation(key);
    }

    return this.cache[key];
};