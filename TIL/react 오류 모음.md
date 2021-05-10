# react 오류 및 정보 모음

### li key

>  Each child in a list should have a unique "key" prop.

<li> 에 key 속성을 주어야한다. 

<li key={id}></li>



### input value

react input태그에 value를 설정해두면 change가 일어나지 않는다. 해결하기 위해 onChange를 사용해야 하는데 이때 input태그가 컴포넌트로 분리가 안되면 input 뿐만 아니라 주면 것들이 모두 리렌더링 된다. 

즉, input 태그를 컴포넌트화 시켜야한다. 상태는 위에서 관리하게하고 하위에서 받아서 사용하면 될듯

 => [react 엘리먼트](https://ko.reactjs.org/docs/rendering-elements.html)에 따르면 react 엘리먼트는 불변객체이기 때문에 해당 element의 자식 or 속성을 변경할 수 없다고 한다. 그렇기 때문에 변경이 안되던게 아니었을까??

### 컴포넌트의 `render` 메서드로부터 `null`을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않습니다. 그 예로 `componentDidUpdate`는 계속해서 호출되게 됩니다.

이말은 그러면 return null보다는 조건부인 경우 컴포넌트를 그냥 호출을하면 안되는 건가? 



### image background설정

image를 경로로 바로 styled components에 하면 안된다.

import ~~ from 경로 한뒤에 ~~를 사용해야 한다. 