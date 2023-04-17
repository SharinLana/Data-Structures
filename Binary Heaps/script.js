// ! BINARY HEAPS
// * Big O:
//?  Insertion = O(Log N)
//?  Removal = O(log N)
//?  Search = O(N)

// ! MAX BINARY HEAP
// * each parent has at most 2 children
// * parents are ALWAYS greater than children
// * siblings are not sorted between themselves
// * left children are filled out first

// ! MIN BINARY HEAP
// * parents are SMALLER than children

//! STORING THE BINARY HEAP
/*
                                        100(0)
                            19(1)                       36(2)
                    17(3)            12(4)          25(5)             5(6)
                9(7)    15(8)   6(9)     11(10)  13(11)  8(12)    1(13)   4(14)

The array:
*[100, 19, 36, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1, 4]

! TO FIND THE CHILD:
For any index of an arr[n] 
? the LEFT child is stored at a position 2n + 1: (the left child of 19 is at index 3: (2*1 + 1) = 17
? the RIGHT child is at 2n + 2: (the right child of 12 has index 10: (2 * 4(index of 12) + 2)) = 11

! TO FIND THE PARENT
For any child node at index n
? its parent i at index Math.floor((n-1)/2)

*/

class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12];
  }

  // ! INSERTION
  // PUSH THE NUMBER TO THE END OF THE ARRAY (it will always be stored on the left side automatically
  // and will take the first empty spot there (right or left))
  // AND THEN COMPARE IT TO ITS PARENT USING Math.floor((n-1)/2)
  // IF THE PARENT IS SMALLER THAN THE PUSHED NUMBER,
  // SWAP THEM. AND KEEP SWAPPING UNTIL THE NUMBER HAS FOUND ITS RIGHT SPOT
  insert(val) {
    this.values.push(val);
    this.bubbleUp(); // helper function comapring the new element to its parent and swapping them if needed
    return this;
  }

  bubbleUp() {
    let index = this.values.length - 1; // index of the new element
    const element = this.values[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parentElem = this.values[parentIndex];

      if (element <= parentElem) break;

      // otherwise, swap parent and the new element:
      [this.values[parentIndex], this.values[index]] = [
        this.values[index],
        this.values[parentIndex],
      ];
      // and change the index to start another loop and compare the element
      // to the new parent
      index = parentIndex;
    }
  }

  // ! REMOVING THE MAXIMUM ELEMENT IN THE BINARY HEAP (EXTRACTING MAX)
  // The idea is to cut the root and replace it
  // with the very last element of the heap.
  // Then we have to compare the new root to each of the children
  //  and swap until the new root takes its right place.
  extractMax() {
    // initial array [55, 39, 41, 18, 27, 12, 33]
    const max = this.values[0];
    const end = this.values.pop();

    // Run this code only if the array is not empty
    if (this.values.length > 0) {
      this.values[0] = end;
      // result at this point: [33, 39, 41, 18, 27, 12]

      this.sinkDown();
    }

    return max;
  }

  sinkDown() {
    // result at this point: [33, 39, 41, 18, 27, 12]
    let index = 0;
    let length = this.values.length;
    let element = this.values[0]; // always 33

    // loop through the array and when the right place is found, break the loop
    while (true) {
      // find the indexes of the 2 children of the 33:
      // the left (2n + 1) and right (2n + 2) one
      // and compare 33 to each of them.
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;

      let rightChild, leftChild;
      let swap = null;

      // if the index of the left child is valid (not out of bounds)
      // then define this child
      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }

      // If the index of the right child is valid,
      // then define the right child
      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        // also, we have to make sure that we chose the biggest of the children for swapping:
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild) // if the swap happened BUT the right child is bigger than the left...
        ) {
          swap = rightChildIndex;
        }
      }

      // if there's no swaps happend, break the loop
      if (swap === null) break;

      // otherwise, swap the element with the largest child
      this.values[index] = this.values[swap];
      this.values[swap] = element;

      // And keep going: check the new element's children after swapping
      index = swap;
    }
  }
}

let heap = new MaxBinaryHeap();
heap.insert(55);
console.log(heap.values); //  [55, 39, 41, 18, 27, 12, 33]
console.log(heap.extractMax()); // 55
console.log(heap.values); // [41, 39, 33, 18, 27, 12]

// ! PRIORITY QUEUE
// The node with the highest priority serves first

// * AN EXAMPLE WITH THE MIN BINARY HIPS (parents are always lower than children)
// So, in this case the highest priority will have the lowest number;

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

let emergencyRoom = new PriorityQueue();
// Adding cases and setting their priority levels
// the lower number the higher priority
emergencyRoom.enqueue("common cold", 5);
emergencyRoom.enqueue("gunshot wound", 1);
emergencyRoom.enqueue("high fever", 4);
emergencyRoom.enqueue("broken arm", 2);
emergencyRoom.enqueue("glass in foot", 3);

// Serving (dequeueing) the cases based on their priority level
console.log(emergencyRoom.dequeue()); // {val: 'gunshot wound', prioriry: 1}
console.log(emergencyRoom.dequeue()); // {val: 'broken arm', priority: 2}
console.log(emergencyRoom.dequeue()); // {val: 'glass in foot', priority: 3}
console.log(emergencyRoom.dequeue()); // {val: 'high fever', priority: 4}
console.log(emergencyRoom.dequeue()); // {val: 'common cold', priority: 5}
console.log(emergencyRoom.dequeue()); // undefined
