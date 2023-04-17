// ! TREE TRAVERSAL
// ! ALL TYPES OF TREES

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class TreeTraversal {
  constructor() {
    this.root = null;
  }

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

  // !  HORIZONTAL SEARCHING (BREADTH FIRST SEARCH) 
  // ! CAN TAKE A LOT SPACCE IN MEMORY (IF THE TREE IS REALLY WIDE)
  breadthFirstSearch() {
    let node = this.root;
    let data = [];
    let queue = [];
    queue.push(node);

    // We put each node to the queue, and then - to the data array.
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  // ! DEPTH FIRST SEARCH (DOES NOT TAKE MUCH SPACE IN MEMORY )
  // DEPTH FIRST SEARCH - PreOrder
  // We start from the root => then checking the entire left side =>
  // then returning back to the root and chacking the right side
  DFSPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(current); // invoked the helper function
    return data;
  }

  // DEPTH FIRST SEARCH - PostOrder
  // First, we explore the LEAVES on the left side => then their parent =>
  // then we go straight to the right side =>
  // and AT THE VERY END, we check the root
  DFSPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }
    traverse(current);
    return data;
  }

  // DEPTH FIRST SEARCH - InOrder
  // Visit the left side => then the root => then - the right side
  DFSInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }
}

let tree = new TreeTraversal();
tree.insert(15);
tree.insert(7);
tree.insert(25);
tree.insert(47);
tree.insert(56);
tree.insert(6);
console.log(tree.breadthFirstSearch()); //  [15, 7, 25, 47, 56, 6]
console.log(tree.DFSPreOrder()); //  [15, 7, 25, 47, 56, 6]
console.log(tree.DFSPostOrder()); // doesn't work. Maybe the problem in the insert() function
console.log(tree.DFSInOrder()); // doesn't work either...