var hasCycle = function (head) {
  const nodeArr = new Set();
  let node = head;
  while (true) {
    if (!node) return false;
    if (nodeArr.has(node)) return true;
    nodeArr.add(node);
    node = node.next;
  }
};
