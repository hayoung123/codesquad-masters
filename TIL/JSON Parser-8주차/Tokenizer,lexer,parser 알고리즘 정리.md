# Tokenizer

# Lexer

# Parser

subType기준으로 4가지 경우가 있다. 

- open: `[`, `{`

- close: `]`, `}`

- proKey: Object key

- 나머지: 스트링, 숫자, 불린, 널, 등등

### open일 때

1. 자신의 타입에 맞는 child를 갖는 객체를 생성한다. 현재 open이 close될 때까지 생성된 객체의 child에 값들이 담기게 된다.  (`{type,child:[]}`)

2. 현재 생성한 객체를 부모노드로 이용해 재귀호출한다.

   `preParser(배열, 부모노드) ` 

   - 배열: 현재 다음 index부터의 배열  `배열.slice(idx+1)`

   - 부모노드: 생성된 {type,child:[]}가 담겨서 재귀 호출이 실행된다. 

3. 반환된 `skipIndex`만큼 index를 더해준다.

4.  현재콜스택 부모 노드의 child에 반환된 node를 push한다.

### close일 때

현재 부모노드와 현재까지 진행된 `index+1`을 `skipIndex`로 반환한다. 

현재 콜스택에서 진행한 index의 값 +1 만큼을 반환해 상위 콜스택에서 진행한 부분 만큼은 skip할 수 있게 했다.


### propKey일 때 

객체의 키일 때는 Object value까지 이 단계에서 처리해준다. 그렇기 때문에 index skip처리에 신경 써야한다.

1. 현재 인덱스의 값 - Object key를 이용해서 `objectPropertyNode`를 생성 (`{ value: { propKey: { type, value }, propValue: {} }, type: 'objectProperty'} `)

3. 다음 인덱스의 값 - Object value를 이용해서 `objectPropertyValueNode`를 생성

    #### - Object value array,object 경우
	1. open처럼 재귀 후 반환된 node를 `objectPropertyNode.value.propValue`에 넣어준다.
    2. 현재콜스택 부모 노드의 child에 완성된  `objectPropertyNode`를 넣어준다.
    3. 반환된 `skipIndex`만큼 index를 더해준다.
    #### - 단순한 값일 경우
    1. Object value 노드를 만들어 `objectPropertyNode.value.propValue`에 넣어준다.
    2. 현재콜스택 부모 노드의 child에 완성된  `objectPropertyNode`를 넣어준다.
    3. Object value 하나만 추가로 처리했으니 i+1 해준다.

### 그 외 일반적인 값일 때 

현재콜스택 부모 노드의 child에 현재 값의 노드를 넣어준다. (`{ type, value }`)  



