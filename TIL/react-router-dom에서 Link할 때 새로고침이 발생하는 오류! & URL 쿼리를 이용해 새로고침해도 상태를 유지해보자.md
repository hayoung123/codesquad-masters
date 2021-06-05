# react-router-dom에서 Link할 때 새로고침이 발생하는 오류!? & URL 쿼리를 이용해 새로고침해도 상태를 유지해보자

이번 에어비엔비 프로젝트를 하면서 `react-router-dom`라이브러리를 사용해서 라우팅을 했다. `Link`로 라우팅을 할 때 SPA이기 때문에 상태는 상태는 유지되면서 url이 변경 되어야 한다. 즉 새로고침은 되지 않고 넘어가야지 정상적인 작업이다. 

하지만!? `Link`를 통해서 url을 변경하면 새로고침이 되는 문제가 있었다. 

위와 같은 문제를 해결한 방법이 2가지 있다. 하나는 임시방편의 해결방법이고 하나는 문제가 발생한 원인을 해결했다. 

- 임시방편의 해결 

URL쿼리에 상태값을 넣어서 라우팅한 뒤에 그걸로 `setState`를 해주는 방법

- 문제의 원인 및 해결

버블링 방지인 `event.stopPropagation()`을 사용했기 때문에 발생해서 해결했다. 



버블링 방지를 했을 때 일어나는 일을 간단하게 codeSandbox를 통해 확인해 보자.

- Plus10 클릭 :  결과값 10씩 상승. 
- AllowBubbling 클릭: 페이지를 이동 & 상태가 유지
- PreventBubbling 클릭: 페이지로 이동 & **새로고침** & 상태를 초기화

(코드 샌드박스에서는 `PreventBubbling` 클릭 시 url로 이동 하지 않지만 실제는 이동하는게 맞는 것같다. 샌드박스에서는 새로고침 되는 부분에 대해서만 확인하면 될 것 같다.)

<iframe src="https://codesandbox.io/embed/react-router-dom-guhyeonhaebogi-9cj5h?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-router-dom 구현해보기"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



## 왜 이럴까?

원인은 `Link`의 `children` 에서 **click핸들러**에 `event.stopPropagation()`을 적용하면 Link까지 클릭 이벤트가 전파되지 않는다.

그렇기 때문에 `Link`내부에서 `a`태그에 적용시킨 `event.preventDefault()`가 동작하지 않아서 `a`태그의 기본 동작으로 새로고침되면서 페이지 이동을 하는 것 같다. ([react-router-dom__Link](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js#L39) 소스를 정확하게는 이해하지 못했기 때문에.. 어느정도의 추측입니다. 혹시 정확한 원리를 아시는 분은 댓글로 알려주시면 너무 감사하겠습니다!!)

---

## URL에 쿼리를 적용한다?

처음에 버블링 방지하는 코드 때문에 새로고침이 발생한다는 것을 알지 못하고 이를 해결하기 위해 URL에 쿼리로 상태값을 넣어서 라우팅을 했습니다. 현재 URL에서 렌더링 되는 페이지에서는 쿼리 값을 가져와서 `setState`를 해주게 됩니다. 덕분에 새로고침을 해도 url을 기반으로 상태를 setting 해주기 때문에 전의 상태를 유지시킬 수 있습니다. 

이로 인해서 예상치 못한 장점들이 발생하게 됐습니다. 

- 개발단계에서 너무 편리했습니다. 기능구현 단계에서 테스트 해볼 때 유용했습니다.
- 사용자의 UX적인 면에서도 새로고침을 했을 때 자신이 선택한 값들이 그대로 있을 것이라는 기대를 충족시킬 수 있습니다.

airbnb 페이지를 보면 실제로 URL에 쿼리로 상태값들이 저장돼있는 것을 확인할 수 있습니다.  

---

## 마무리

프로젝트에서 `Link` 얘 때문에 많이 힘들었다. 왜 자꾸 나만 새로고침이 되는건지... 구조상 `stopPropagation`을 제거하기 힘들어서 그냥 진행했었는데 결국 수정했다. 

하지만 이 문제를 해결하기 위한 과정에서 URL에 쿼리로 넣어서 구현하는 방법 및 장점을 알게 돼서 좋았다. 앞으로는 라우팅할 때 필요한 상태는 URL에 넣어서 진행할 것 같다. (단점은 아직 알아보지 않았는데.. 단점이 있다면 고민을 다시 해봐야 될 것 같다. 혹시 단점을 아시는 분들은 댓글에 남겨주시면 너무 감사하겠습니다!)

