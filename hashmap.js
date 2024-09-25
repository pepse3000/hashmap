import Node from "./node.js";
import LinkedList from "./linkedlist.js";

export default class HashMap {
  constructor() {
    this._array = Array(16).fill("");
    this._loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNubmer = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNubmer * hashCode + key.charCodeAt(i);
    }

    return hashCode % this._array.length;
  }

  set(key, value) {
    let hashCode = this.hash(key);

    if (this.get(key)) {
      let temp = this.get(key).head;
      while (temp.hasOwnProperty("value")) {
        if (temp.key == key) {
          temp.value = value;
          return;
        }
        temp = temp.nextNode;
        if (!temp) break;
      }

      this._array[hashCode].append(key, value);
    } else {
      this._array[hashCode] = new LinkedList();
      this._array[hashCode].append(key, value);
    }

    this._expandHashMap();
  }

  get(key) {
    let hashCode = this.hash(key);

    if (this._array[hashCode]) {
      return this._array[hashCode];
    } else {
      return null;
    }
  }

  has(key) {
    let hashCode = this.hash(key);
    return this._array[hashCode].contains(key);
  }

  remove(key) {
    let hashCode = this.hash(key);
    if (this._array[hashCode]) this._array[hashCode].removeAt(this._array[hashCode].find(key));
  }

  length() {
    let count = 0;

    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i]) {
        let temp = this._array[i];
        if (temp.head) count += temp.size();
      }
    }

    return count;
  }

  clear() {
    this._array = Array(16).fill("");
  }

  keys() {
    let keys = [];

    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i]) {
        let temp = this._array[i].head;

        while (temp.hasOwnProperty("key")) {
          keys.push(temp.key);
          temp = temp.nextNode;
          if (!temp) break;
        }
      }
    }

    return keys;
  }

  values() {
    let values = [];

    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i]) {
        let temp = this._array[i].head;

        while (temp.hasOwnProperty("value")) {
          values.push(temp.value);
          temp = temp.nextNode;
          if (!temp) break;
        }
      }
    }

    return values;
  }

  entries() {
    let pairs = [];
    let keys = this.keys();
    let values = this.values();

    for (let i = 0; i < keys.length; i++) {
      pairs.push([keys[i], values[i]]);
    }

    return pairs;
  }

  _checkLoadFactor() {
    let count = 0;
    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i]) count++;
    }

    return count / this._array.length > this._loadFactor ? true : false;
  }

  _expandHashMap() {
    if (this._checkLoadFactor()) {
      this._array = [...this._array, ...Array(this._array.length).fill("")];
    }
  }
}