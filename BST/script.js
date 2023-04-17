// ! BINARY SEARCH TREES - have only 2 children

// * The main difference between BST and just BT (Binary Trees):
// * LEFT side of BST is always SMALLER than the parent/root
// * RIGHT side of BST is always BIGGER than the parent/root

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // ! O(log n), but not guaranteed (for example, for a 1-sided binary tree the Big O = O(n))!
  // ADDING A NEW NODE
  insert(val) {
    let newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val === current.value) return undefined; // to prevent the infinite loop

      if (val < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        } else {
          current = current.left; // if we already have a parent on the left side, then we make it current
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  // ! O(log n), but not guaranteed (for example, for a 1-sided binary tree the Big O = O(n))!
  //FINDING A NODE: true if the node exists in the tree, false - if does not
  find(val) {
    if (!this.root) return false;
  
    let current = this.root;
    let found = false;

    while(current && !found) {
      if (val < current.value) {
        current = current.left
      } else if (val > current.value) {
        current = current.right;
      } else {
        return true; // ot you can return current
      }
    }

    return false;
  }
}

let tree = new BST();
