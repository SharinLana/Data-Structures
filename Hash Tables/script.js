// ! HASH TABLE
// ! BIG O (average and best case):
// * Insert: O(1)
// * Deletion: O(1)
// * Access: O(1)

// ! RECAP
// * Hash tables are collections of key-value pairs
// * Can find values quickly given a key
// * Can add new key-value pairs quickly
// * Hash tables store data in a large array, and work by hashing the keys
// * A good hash has to be fast, distribute unique keys and be deterministic (give the
// * exact same output every time for the same input)

// ! HASH FUNCTION PSEUDOCODE
function hash(elem, arrayLength) {
  let total = 0;
  let PRIME = 31; // helps to make the calculation much faster than a non-prime Number

  // Loop throught the element (and if its length is > than 100, then pick 100)
  for (let i = 0; i < Math.min(elem.length, 100); i++) {
    let char = elem[i];
    let value = char.charCodeAt(0) - 96; // the first letter of the alphabet has number 97
    // when we deduct 96, we are getting the position of the letter in the alphabet

    total = (total + PRIME + value) % arrayLength;
  }
  return total;
}
// The result will ALWAYS stays the same for the current word and the array length = 20
console.log(hash("pink", 20)); // 14
console.log(hash("hello", 20)); // 7
console.log(hash("goodbye", 20)); // 10
console.log(hash("movie", 20)); // 19

// ! HANDLING COLLISIONS

// ! Separate Chaining
// ! (allowes to store multiple key-value pairs together at the same position)
// * [["darkblue", "#0008b"], ["salmon", "#fa8072"]] -> both at the index 4

// ! Linear Probing
// ! (when we find a collision, we search through the array to find the next empty slot).
// ! Each key-value pair has unique index
// * darkblue -> 4
// * salmon -> 4, but it's occupied already. So we are looking for the next empty index (5), and store the key-value pair there
// * tomato -> 4 (occupied) -> 5? (occupied) -> 6

class HashTable {
  constructor(size = 53) {
    // the name of the main array for all the key-value pairs
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    let PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;

      total = (total + PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    // 1. Hash the key, and receive its index
    let index = this._hash(key);

    // 2. Implementing Separate Chaining.
    // Check if this index already stores another key-value pair.
    // And if so, loop through it and put the new pair next to the existing one(s)
    if (!this.keyMap[index]) {
      // If the HashTable under this index is empty, set it to an empty array
      this.keyMap[index] = [];
    }
    // If it's filled with the key-value pairs, just push the new one to the current ones:
    this.keyMap[index].push([key, value]);
  }

  // ! Getting the value of the particular key
  get(key) {
    let index = this._hash(key);

    // If there's something under the this.keyMap[index],
    if (this.keyMap[index]) {
      // then we have to loop through the subarrays
      for (let i = 0; i < this.keyMap[index].length; i++) {
        // and if there's a subarray with this key in there...
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }

    // If there's nothing under the this.keyMap[index],
    // then return undefined
    return undefined;
  }

  // ! Get an array filled with all the keys of the Hash Table
  keys() {
    let keysArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        // If the subarray exists, then loop through it:
        for (let j = 0; j < this.keyMap[i].length; j++) {
          // PREVENT TO ADD DUPLICATE VALUES TO THE ARRAY
          // If the valuesArr does NOT include such value...
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            // ...then store it in the valuesArr
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    return keysArr;
  }

  // ! Get an array of all the values of the Hash Table
  values() {
    let valuesArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        // If the subarray exists, then loop through it:
        for (let j = 0; j < this.keyMap[i].length; j++) {
          // PREVENT TO ADD DUPLICATE VALUES TO THE ARRAY
          // If the valuesArr does NOT include such value...
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            // ...then store it in the valuesArr
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    return valuesArr;
  }
}

let ht = new HashTable(17);

ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
ht.set("lightcoral", "#F08080");
ht.set("plum", "#DDA0DD");
ht.set("plum", "#DDA0DD");
ht.set("plum", "#DDA0DD");
console.log(ht); // keyMap: (17)

console.log(ht.get("olive")); // #808000
console.log(ht.get("plum")); // #DDA0DD
console.log(ht.get("plumber")); //undefined

console.log(ht.values()); // No duplicates: ['#DDA0DD', '#FA8072', '#FFFF00', '#800000', '#F08080', '#808000']

console.log(ht.keys()); //
