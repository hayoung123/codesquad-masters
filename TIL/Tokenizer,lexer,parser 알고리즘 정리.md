# Tokenizer

# Lexer

# Parser

subType기준으로 4가지 경우가 있다. 

open, close, propKey, 나머지

open: `[`, `{`

close: `]`, `}`

proKey: 객체의 key

나머지: 스트링, 숫자, 불린, 널, 등등



`preParser(배열, 부모노드) ` 

배열에 Lexer를 통해 token에 의미가 부여된 배열, 부모노드에 시작에는 init노드가 들어간다. 

### open일 때

1. child를 갖는 자신의 타입에 맞는 {type,child:[]} 를 생성한다. 현재 open이 close될 때까지 생성된 객체의 child에 값들이 담기게 된다. 

2. 현재 생성한 객체를 부모노드로 재귀호출한다.

   `preParser(배열, 부모노드) ` 

   - 배열: 현재 다음 index부터의 배열  `배열.slice(idx+1)`

   - 부모노드: 생성된 {type,child:[]}가 담겨서 재귀 호출이 실행된다. 

3. 재귀가 완료됐으면 {node,skipIndex}가 반환 돼 index를 skipIndex만큼 더해주고 현재콜스택 부모 노드의 child에 반환된 node를 push한다.

```javascript
const parentNode = makeNode(value); // 1번 
const newNode = preParser(arr.slice(i + 1), parentNode); //2번
i += newNode.skipIndex; //3번
node.child.push(newNode.node); //3번
```

### close일 때

현재 부모노드와 현재까지 진행된 `index+1`을 `skipIndex`로 반환한다. 

```javascript
return { node, skipIndex: i + 1 };
```

### propKey일 때 

객체의 키일 때는 value까지 이 단계에서 처리해준다. 그렇기 때문에 index skip처리에 신경 써야한다.

1. 키정보를 이용해서 object property node를 생성한다.
    `{ value: { propKey: { type, value }, propValue: {} }, type: 'objectProperty' };`