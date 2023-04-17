// ! QUEUES
// ! FIFO data structure (first In - first Out


// * For Arrays it's push() - shift() pair (STRONGLY PREFERRED!) || unshift() - pop() pair
// But in this case, the elements in the array have to be reindexed
// while shifting/unshifting.

// * For the Singly Linked List:

// ! Big O:
// ! Insertion => O(1)
// ! Removal => O(1)
// ! Searching => O(n)
// ! Access => O(n)

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  push(val) {
    let newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
        let tempLast = this.last;
        tempLast.next = newNode;

        this.last = newNode;
        this.last.next = null;
    }

    this.length++;
    return this;
  }

  shift() {
    let target = this.first;
    let secondNode = target.next;

    if (this.length === 0) return null;

    if (this.length === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = secondNode;
      target.next = null;
    }

    this.length--;
    return target.value;
  }
}

let list = new Queue();

list.push("FIRST");
console.log(list); // first: "FIRST", last: "FIRST", legth: 1
list.push("SECOND");
console.log(list); // first: "FIRST", last: "SECOND", legth: 2
list.push('THIRD');
console.log(list); // first: "FIRST", first.next: "SECOND", last: "THIRD", legth: 3
console.log(list.shift()); // Node {val: 'FIRST', next: null}
console.log(list); // first: "FIRST", last: "SECOND", legth: 2
console.log(list.shift()); // Node {val: 'SECOND', next: null}
console.log(list); // first: "FIRST", last: "FIRST", legth: 1
console.log(list.shift()); // Node {val: 'THIRD', next: null}
console.log(list); // first: null, last: null, legth: 0