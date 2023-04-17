// ! SINGLY LINKED LIST

// * DEFINITION:
// A data structure that contains a HEAD, TAIL and LENGTH property.
// There is NO INDEXES!
// Linked Lists consist of nodes,
// and each NODE has a VALUE and a Pointer to another node or NULL
// * A skyscraper without elevators, only stairs are available
// (random access is not allowed)

// *     4    =>     6   =>      8   =>      2       =>
//    HEAD   next       next        next    TAIL    null
// Length = 4

// ? WHEN TO USE?
// When you are going to make a lot of insertion and deletions:
// Linked Lists do not have indexes, so the insertion and deletions
// won't be as expensive as in arrays.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // * INSERTION: Big O = O(1)
  push(val) {
    let newNode = new Node(val);

    //  If the linked list is empty
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      // If it's not empty
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this; // return the hole linked list
  }

  // * REMOVAL FROM THE END: Big O = O(n)
  pop() {
    if (!this.head) return undefined;
    // We need to find the value that is 2nd to the last and make it a new Tail
    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current; // set the newTail to current
      current = current.next; // and move the current one step forward
    }
    // console.log(current.val); // 140
    // console.log(newTail.val); // baby
    this.tail = newTail;
    this.tail.next = null; // popped (removed) the last Node
    this.length--;

    // If the list is empty (we removed all the Nodes), return to the default state
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  // * REMOVAL FROM THE BEGINNING: Big O = O(1)
  shift() {
    if (!this.head) return undefined;

    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    // If the list is empty (we removed all the Nodes), return to the default state
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return currentHead;
  }

  // * INSERTION: Big O = O(1)
  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // * Big O = O(n)
  get(index) {
    if (index < 0 || index > this.length - 1) return null;

    let counter = 0;
    let currentNode = this.head;

    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  // * Big O = O(n)
  set(index, newVal) {
    if (this.get(index)) {
      this.get(index).val = newVal;
      return true;
    }
    return false;
  }

  // * INSERTION: Big O = O(1)
  insert(index, value) {
    if (index < 0 || index > this.length) return false;

    if (index === this.length) {
      this.push(value);
      return true;
    }
    if (index === 0) {
      this.unshift(value);
      return;
    }

    let newNode = new Node(value);
    let temp = this.get(index - 1).next;

    this.get(index - 1).next = newNode;
    newNode.next = temp;

    this.length++;
    return true;
  }

  // * REMOVAL FROM THE BEGINNING: Big O = O(1)
  // * REMOVAL FROM THE MIDDLE/END: Big O = O(n)
  remove(index) {
    if (index < 0 || index > this.length) return null;

    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();

    let prev = this.get(index - 1);
    let removed = prev.next;
    prev.next = removed.next;
    this.length--;

    return removed;
  }

  // * Big O = O(n)
  reverse() {
    // Swap the HEAD and TAIL
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;

      // [  13,   ->    21,   ->    14,   ->   15,   ->    17 -> null]
      //   node   ->   next
      //    13    ->   null
      //   prev   <-   node
      //               node.next      ->    next
      //               prev (21)      <-    node (14)
      //  etc
    }
    return this;
  }
}

let list = new SingleLinkedList();
// PUSHING
list.push("Hey,");
console.log(list); // SingleLinkedList {head: Node, tail: 'Hey,', length: 1}
list.push("baby");
console.log(list); // SingleLinkedList {head: Node, tail: Node, length: 2} => head: Node {val: 'Hey,', next: Node}, tail: Node {val: 'baby', next: null}
list.push(140);
console.log(list.head); // Node {val: 'Hey,', next: Node}
console.log(list.head.next); // Node {val: 'baby', next: null}
console.log(list.head.next.next); // Node {val: 140, next: null}
console.log(list.tail); // Node {val: 140, next: null}

// POPPING
console.log(list); // "Hay", "baby", 140;  SingleLinkedList {head: Node, tail: Node, length: 3}
list.pop();
console.log(list); // "Hey", "baby"; SingleLinkedList {head: Node, tail: Node, length: 2}
list.pop();
console.log(list); // "Hey", SingleLinkedList {head: Node, tail: Node, length: 1}
list.pop();
console.log(list); // null, SingleLinkedList {head: null, tail: null, length: 0}

// SHIFTING
// (Removing a new node from the beginning of the Linked List)
list.push("I");
list.push("am");
list.push("learning");
list.push("data");
list.push("sctructure");
console.log(list); // SingleLinkedList {head: Node, tail: Node, length: 5}
list.shift();
console.log(list); // head = "am", SingleLinkedList {head: Node, tail: Node, length: 4}

// UNSHIFTING
console.log(list); // head = "am", SingleLinkedList {head: Node, tail: Node, length: 4}
list.unshift("I");
console.log(list); // head = "I" , SingleLinkedList {head: Node, tail: Node, length: 5}

// RETRIEVING A NODE BY ITS POSITION IN THE LINKED LIST
// GET()
console.log(list); // SingleLinkedList {head: Node, tail: Node, length: 5}
console.log(list.get(-1)); // null
console.log(list.get(0)); // Node {val: 'I', next: Node}
console.log(list.get(4)); // Node {val: 'sctructure', next: null}
console.log(list.get(5)); // null

// SET()
// CHANGING THE VALUE OF THE NODE BASED ON ITS POSITION IN THE LIST
console.log(list); // "I" "am" "learning" "data" "structure" SingleLinkedList {head: Node, tail: Node, length: 5}
list.set(1, "will be");
console.log(list); // "I" "will be" "learning" "data" "structure" SingleLinkedList {head: Node, tail: Node, length: 5}

// INSERT
// ADDING A NODE TO THE LINKED LIST AT A SPECIFIC POSITION
console.log(list); //
list.insert(3, "tomorrow");
console.log(list);

// REMOVE
// REMOVING A NODE FROM THE LINKED LIST AT A SPECIFIC POSITION
console.log(list); // SingleLinkedList {head: Node, tail: Node, length: 6}
console.log(list.remove(4)); // data
console.log(list); // SingleLinkedList {head: Node, tail: Node, length: 5}

// REVERSE
// REVERSING THE LINKED LIST IN PLACE
console.log(list); //
list.reverse();
console.log(list); //
