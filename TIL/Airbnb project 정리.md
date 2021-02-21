# Airbnb 클론 코딩 후기

## Airbnb 클론코딩

[깃허브 링크](https://github.com/hayoung123/fe-w12-airbnb)

개발 기간: 02/08 ~ 02/20

​	1주차 : 정적 홈페이지 클론

​	2주차:  동적 기능 클론



## 실행화면



![스크롤](https://images.velog.io/images/proshy/post/98718b53-ceed-4236-9606-8da733c8a1d9/Airbnb%20(1).gif)

![탭](https://images.velog.io/images/proshy/post/f356e68c-296f-4862-b32e-5e8621521030/Airbnb.gif)

![달력](https://images.velog.io/images/proshy/post/2b827925-9c70-43a0-abd6-f62fe01caded/Airbnb%20(3).gif)



HTML, CSS, JS로 airbnb를 클론코딩하는 프로젝트를 진행했습니다. 전체 웹페이지의 레이아웃과 동적인 기능으로는 간단한 탭바, 달력을 구현했습니다. 스스로 처음부터 진행했던 클론 코딩이라 많은 것을 배울 수 있었습니다. 

기존에 HTML, CSS를 동시에 개발하는 것과 다르게 HTML => css => js 각 단계별로 구현을 진행하면서 느낀점들을 간단하게 작성했습니다.

## 동적으로 구현한 기능

- 우측 상단 버튼 클릭시 nav-bar 토글, 바탕화면 누를 시 nav-bar 닫기
- 상단 숙소,체험 클릭 시 각각에 맞는 form으로 변경
- 달력 기능 구현

## 정적 페이지

html과 css로 정적 페이지를 구현할 때 레이아웃에 가장 신경쓰고 헀다. 레이아웃을 맞추는 법은 float, flex, grid등 다양한 방법이 있다. 이번에는 기존에 사용해봤던 flex를 메인으로 삼았으며 grid를 처음으로 배워서 사용해봤다.

### HTML

프로젝트를 진행하는 내내 HTML구조를 설계를 잘하고 해야겠다고 생각했다. css,js파일을 추가할 때마다 자잘하게 수정하는 작업이 정말 많았다. class 네이밍부터 어떤 종류의 태그를 사용해야 좋을지를 고민하면서 작성했던 것 같다.  다음에는 최소한 css까지는 구조를 생각하면서 작성해야겠다는 생각이 들었다.  

### CSS

css는 대부분 익숙한 속성들을 사용했지만 이번에 grid와 pesudo element를 배워서 활용하면서 편해서 놀라웠고 앞으로 자주 사용할 것 같다.

#### gird적용

grid를 적용한 부분이다. float를 사용할 계획이었지만 한번도 사용해보지 않은 grid로 만들어봤다. 

- grid-gap
- grid-row
- grid-column

위 3개의 속성을 이용해서 간단하게 레이아웃을 잡을 수 있었다. 

![grid](https://images.velog.io/images/proshy/post/471fdbdb-9e68-409c-9483-abe04d9d9bf6/image.png)



#### pesudo element

::after을 사용해서 hover, focus등의 효과를 쉽게 적용할 수 있었다. 지금까지 알아보지 않고 넘어갔는데 정말 유용하다 생각해 앞으로는 자주 사용할 것 같다. 

간단하게만 공부해서 지금까지는 absolute로만 position을 잡고 활용했는데 다른 방법이 있는지도 알아봐야겠다.

## 동적 페이지

html

