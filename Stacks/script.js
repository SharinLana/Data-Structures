// ! STACKS

// ! Big O:
// ! Insertion => O(1)
// ! Removal => O(1)
// ! Searching => O(n)
// ! Access => O(n)

// It's a LIFO data structure:
// * LAST element added to the stack
// * will be the FIRST element removed from the stack.
// Consider it as a pile of paper:
// you have to remove the pieces of paper that were added recently
// to get to the bottom of the pile.
// * methods: push/pop for Doubly Linked Lists and arrays
// *          unshift/shift for Singly Linked Lists

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SLLStack {
  constructor() {
    this.length = 0;
    this.first = null;
    this.last = null;
  }

  unshift(val) {
    let newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      let temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }

    this.length++;
    return this;
  }

  shift() {
    if (!this.first) return null;

    let target = this.first;
    let nextNode = target.next;

    if (this.length === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = nextNode;
    }

    this.length--;
    return target.val;
  }
}

let list = new SLLStack();

list.unshift(1);
console.log(list);
list.unshift(2);
console.log(list);
list.unshift(3);
console.log(list); // 3, 2, 1
console.log(list.shift()); // 3
console.log(list); // 2, 1, null
console.log(list.shift()); // 2
console.log(list); // 1, null
console.log(list.shift()); // 1
console.log(list); // null, null
