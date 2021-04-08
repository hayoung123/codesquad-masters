# react 오류 및 정보 모음

### li key

>  Each child in a list should have a unique "key" prop.

<li> 에 key 속성을 주어야한다. 

<li key={id}></li>



### input value

react input태그에 value를 설정해두면 change가 일어나지 않는다. 해결하기 위해 onChange를 사용해야 하는데 이때 input태그가 컴포넌트로 분리가 안되면 input 뿐만 아니라 주면 것들이 모두 리렌더링 된다. 

즉, input 태그를 컴포넌트화 시켜야한다. 상태는 위에서 관리하게하고 하위에서 받아서 사용하면 될듯

