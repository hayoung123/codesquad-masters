# Iteration protocols

Iteration protocols에는 2가지 protocol이 있다.

1. iterable protocol
2. iterator protocol

### 다 함께 예상하는 부분

```javascript
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const mapKey = map.keys();

for (let x of mapKey) console.log(x);
for (let x of mapKey) console.log(x);
```

```javascript
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const mapKey = map.keys();
const mapKeyIter = mapKey[Symbol.iterator]();

for (let x of mapKey) console.log(x);

for (let x of mapKeyIter) console.log(x);
```

### 이해가 되지 않는 부분

spread syntax도 iterable 객체들이 사용가능 한 것이다. 아래의 예시를 보면 일반 객체인 obj는 String과 달리 안되는 것을 확인할 수 있다.

```javascript
let obj = { 1: 1, 2: 2, 3: 3, 4: 4 };
console.log(...obj); // Found non-callable @@iterator

const str = 'hello';
console.log(...str); //h e l l o
```

근데 아래와 같이 할 때는 왜 될까?

```javascript
let copyObj = { ...obj };
console.log(copyObj); //{1: 1, 2: 2, 3: 3, 4: 4}
```
