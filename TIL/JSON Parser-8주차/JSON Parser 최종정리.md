# JSON Parser

[깃허브 링크](https://github.com/hayoung123/fe-w8-json-parser/tree/EamonKyle)

개발기간: 03/29 ~ 04/02

## 실행화면 

![Express](https://user-images.githubusercontent.com/67357426/113427017-405a1d80-940f-11eb-91c1-538990935b6f.gif)

## JSON parser 기본 로직

1. 값을 입력 받는다.
2. Tokenizer에서 필요한 단위로 쪼갠다.
3. Lexer에서 token들에게 의미를 부여한다.
4. Parser에서 Lexer에서 부여한 의미를 이용해서 트리구조를 만든다.



![0001](https://user-images.githubusercontent.com/68339352/113310357-1cc9a100-9343-11eb-9aa5-4773ac7822e8.jpg)
![0002](https://user-images.githubusercontent.com/68339352/113310370-205d2800-9343-11eb-8eea-a0940fe503e7.jpg)

## parser 알고리즘

subType기준으로 4가지 경우가 있다. 

- open: `[`, `{`

- close: `]`, `}`

- propKey: Object key

- 나머지: 스트링, 숫자, 불린, 널, 등등

### open일 때

1. 자신의 타입에 맞는 child를 갖는 객체를 생성한다. 현재 open이 close될 때까지 현재 생성된 객체의 child에 값들이 담기게 된다.  (`{type,child:[]}`)

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

3. 다음 인덱스의 값 - Object value를 이용해서 `objectPropertyValueNode`를 생성 (위에서 생성한 `ObjectPropertyNode.value.propValue`에 들어갈 객체.)

    #### - Object value가 Array or Object인 경우
	1. `open`처럼 현재 Array 또는 Object로 생성한 Object Value 노드를 이용해서 재귀 호출한다. 
    2. 반환된 node를 `objectPropertyNode.value.propValue`에 넣어준다.
    3. 반환된 `skipIndex+1`만큼 index를 더해준다. (Object Value를 처리해줬기 때문에 +1을 추가로 해준다.)
    4. 현재콜스택 부모 노드의 child에 완성된  `objectPropertyNode`를 넣어준다.
    #### - 단순한 값일 경우
    1. Object Value 노드를 만들어 `objectPropertyNode.value.propValue`에 넣어준다.
    2. 현재콜스택 부모 노드의 child에 완성된  `objectPropertyNode`를 넣어준다.
    3. Object value 하나만 추가로 처리했으니 i+1 해준다.

### 그 외 일반적인 값일 때 

현재콜스택 부모 노드의 child에 현재 값의 노드를 넣어준다. (`{ type, value }`)  

## 후기

재귀와 스택을 계속 다루는 미션이다보니 자연스럽게 디버깅하고 콜스택과 조금이나마 가까워질 수 있었다. 토큰으로 나눌 때 정규표현식을 썼으면 하는 아쉬움이 남는다. 그 때문에 예외처리를 하나하나 생각하느라 되게 힘들었었다. (아직까지도 해결못한 예외도 있다.)

이번 미션은 2번째 진행하는 미션이다. 코코아 과정에서 한번했는데 그때의 코드와 많이 달라져있다고 느꼈다. 그때의 재귀는 참 요상하다. 크롱의 수업을 통해 재귀에 대해 조금이나마 자세히 알게 된 것 같다.  

이제 다음주면 백엔드분들과 함께하는 프로젝트가 기다리고 있다. 백엔드 분들이와 협업하는 것도 처음인데 바닐라JS에서 벗어나서 리액트를 처음 다루는 프로젝트가 될 것이다. 한번도 공부해본적이 없기 때문에 걱정이 조금더 큰 상태이다. 이번 주말부터 월요일까지 집중해야 될 때가 온 것 같다. 