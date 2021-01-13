var deleteDuplicates = function (head) {
  let value = -101;
  const headNode = head;
  let node = head;
  let prev = head;

  while (node) {
    if (node.val <= value) {
      prev.next = node.next;
    } else {
      value = node.val;
      prev = node;
    }
    node = node.next;
  }

  return headNode;
};

Line 9 in solution.js
    for(let i=1 i<strs[0].lenght; i++){
                ^
SyntaxError: Unexpected identifier
    Line 1116: Char 16 in loader.js (wrapSafe)
    Line 1164: Char 27 in loader.js (Module._compile)
    Line 1220: Char 10 in loader.js (Object.Module._extensions..js)
    Line 1049: Char 32 in loader.js (Module.load)
    Line 937: Char 14 in loader.js (Function.Module._load)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    Line 17: Char 47 in run_main_module.js