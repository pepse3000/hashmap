import Node from "./node.js";

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
      return;
    };
    this.tail().nextNode = new Node(key, value);
  }

  prepend(value) {
    let tmp = this.head;
    this.head = new Node(value);
    this.head.nextNode = tmp;
  }

  size() {
    if (!this.head) return -1;

    let count = 1;
    let tmp = this.head;
    while (tmp.nextNode) {
      count++;
      tmp = tmp.nextNode;
    }
    return count;
  }

  head() {
    return this.head;
  }

  tail() {
    if (!this.head) return null;
    if (this.head.nextNode == null) return this.head;

    let tmp = this.head;
    while (tmp.nextNode) {
      tmp = tmp.nextNode;
    }

    return tmp;
  }

  at(index) {
    if (index > this.size()) return null;
    if (index == 0) return this.head;

    let count = 0;
    let tmp = this.head;

    while (count != index) {
      tmp = tmp.nextNode;
      count++;
    }

    return tmp;
  }

  pop() {
    if (!this.head) return null;
    if (!this.head.nextNode) return this.head = null;

    let tmp = this.head;

    while (tmp.nextNode) {
      if (!tmp.nextNode.nextNode) {
        tmp.nextNode = null;
        break;
      }
      tmp = tmp.nextNode;
    }
  }

  contains(value) {
    if (!this.head) return null;

    let tmp = this.head;

    while (tmp.nextNode || !tmp.nextNode && tmp.value) {
      if (tmp.value == value || tmp.key == value) {
        return true;
      }
      tmp = tmp.nextNode;
    }

    return false;
  }

  find(value) {
    if (!this.head) return null;

    let tmp = this.head;
    let count = 0;

    while (tmp.nextNode || !tmp.nextNode && tmp.value) {
      if (tmp.value == value || tmp.key == value) {
        return count;
      }

      tmp = tmp.nextNode;
      count++;
    }

    return null;
  }

  toString() {
    if (!this.head) return null;

    let tmp = this.head;
    let str = `( ${this.head.value} ) -> `

    while (tmp.nextNode) {
      tmp = tmp.nextNode;
      str = str + `( ${tmp.value} ) -> `;
    }

    return console.log(str + "null");
  }

  insertAt(value, index) {
    if (!this.head) return null;
    if (index > this.size() - 1) return null;

    let insertEl = this.at(index);
    let tmp = insertEl.nextNode;

    insertEl.nextNode = new Node(value);
    this.at(index + 1).nextNode = tmp;
  }

  removeAt(index) {
    if (!this.head) return null;
    if (index > this.size()) return null;
    if (index == 0) {
      this.head = this.head.nextNode;
      return;
    };

    let beforeRemove = this.at(index - 1);
    let nextToRemovedElement = this.at(index + 1);

    beforeRemove.nextNode = nextToRemovedElement;
  }
}