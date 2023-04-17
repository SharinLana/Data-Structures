// ! DOUBLY LINKED LIST

// * DEFINITION:
// Almost identical to the Singly Linked Lists
// except every node has another pointer,
// to the previous node.
// So the nodes of the Doubly Linked List point at both directions.
// *                        next  =>        next  =>       next  =>                null  =>
// *            (HEAD) 4                6              8              (TAIL) 2
// * <= null                <= prev         <= prev         <= prev

// Length = 4

// ? WHEN TO USE?
//

// * COMPARISONS WITH SINGLY LINKED LIST
// The Doubly Linked List takes more memory.
// But provides you with more flexibility.
// So it's almost always a tradeoff!

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoiblyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // * O(1)
  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }
  // * O(1)
  pop() {
    if (this.length === 0) return null;

    let candidateForRemoval = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = candidateForRemoval.prev;
      this.tail.next = null;
      candidateForRemoval.prev = null; // WE NEED TO DO THAT, OTHERWISE IF WE console.log(list.pop().prev)
      //   we'll be able to see the previous connections of the deleted node.
    }
    this.length--;
    return candidateForRemoval; // the value that we removed
  }
  // * O(1)
  shift() {
    if (!this.head) return null;

    let oldHead = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead; // the value we removed;
  }
  // * O(1)
  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  // * O(n)
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter, currentNode;

    if (index <= Math.floor(this.length / 2)) {
      console.log("WORKING FROM START");

      counter = 0;
      currentNode = this.head;

      while (index !== counter) {
        currentNode = currentNode.next;
        counter++;
      }
    } else {
      console.log("WORKING FROM END");

      counter = this.length - 1;
      currentNode = this.tail;

      while (counter !== index) {
        currentNode = currentNode.prev;
        counter--;
      }
    }

    return currentNode;
  }

  // * O(n)
  set(index, val) {
    let node = this.get(index);

    if (node !== null) {
      node.val = val;
      return true;
    } else {
      return false;
    }
  }

  // * O(1)
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return this.unshift(val);
    if (index === this.length) return this.push(val);

    let newNode = new Node(val);
    let prevNode = this.get(index - 1);
    let nextNode = prevNode.next;

    prevNode.next = newNode;
    newNode.prev = prevNode;

    newNode.next = nextNode;
    nextNode.prev = newNode;
    this.length++;

    return true;
  }

  // * O(1)
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    let target = this.get(index);
    let previousNode = target.prev;
    let nextNode = target.next;

    target.next = null;
    target.prev = null;

    previousNode.next = nextNode;
    nextNode.prev = previousNode;

    this.length--;
    return target;
  }

  reverse() {
    if (!this.head) return undefined;

    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let next = null;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }
}

let list = new DoiblyLinkedList();

// PUSHING
console.log(list); // DoiblyLinkedList {head: null, tail: null, length: 0}
console.log(list.push("Make")); // DoiblyLinkedList {head: Node, tail: Node, length: 1}
console.log(list.push("a")); // DoiblyLinkedList {head: Node, tail: Node, length: 2}
console.log(list.push("wish")); // DoiblyLinkedList {head: Node, tail: Node, length: 3}

// POPPING
console.log(list); // DoiblyLinkedList {head: Node, tail: Node, length: 3}
console.log(list.pop()); // Node {val: 'wish', next: null, prev: null}
console.log(list); // DoiblyLinkedList {head: Node, tail: Node, length: 2}

// SHIFTING
console.log(list); // "Make", "a": DoiblyLinkedList {head: Node, tail: Node, length: 2}
console.log(list.shift()); // Node {val: 'Make', next: null, prev: null}
console.log(list); // "a": DoiblyLinkedList {head: Node, tail: Node, length: 1}

// UNSHIFTING
console.log(list); // "a":  DoiblyLinkedList {head: Node, tail: Node, length: 1}
list.unshift("Make");
console.log(list); // "Make", "a": DoiblyLinkedList {head: Node, tail: Node, length: 2}

// GET
list.push("wish");
console.log(list);
list.push("today");
console.log(list); // "Make", "a", "wish", "today"
console.log(list.get(-1)); // null
console.log(list.get(0)); // Node {val: 'Make', next: Node, prev: null}
console.log(list.get(1)); // Node {val: 'a', next: Node, prev: Node}
console.log(list.get(2)); // Node {val: 'wish', next: Node, prev: Node}
console.log(list.get(3)); // Node {val: 'today', next: null, prev: Node}
console.log(list.get(4)); // null

// SET (REPLACE)
list.set(3, "tomorrow");
console.log(list); // tail: Node {val: 'tomorrow', next: null, prev: Node}
console.log(list.set(4, "yep")); // false

// INSERT
list.insert(0, "FIRST");
console.log(list); // "FIRST", "Make", "a", "wish", "tomorrow"
console.log(list.insert(5, "baby"));
console.log(list); // "FIRST", "Make", "a", "wish", "tomorrow", "baby"
list.insert(3, "great");
console.log(list); // "FIRST", "Make", "a", "great", "wish", "tomorrow", "baby"

// REMOVE
console.log(list); // "FIRST", "Make", "a", "great", "wish", "tomorrow", "baby"
console.log(list.remove(6)); // Node {val: 'baby', next: null, prev: null}
console.log(list); // "FIRST", "Make", "a", "great", "wish", "tomorrow"
console.log(list.remove(0)); // Node {val: 'FIRST', next: null, prev: null}
console.log(list); // "Make", "a", "great", "wish", "tomorrow"
console.log(list.remove(2)); // Node {val: 'great', next: null, prev: null}
console.log(list); // "Make", "a", "wish", "tomorrow"
