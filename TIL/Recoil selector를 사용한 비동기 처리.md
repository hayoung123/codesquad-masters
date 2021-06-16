# Recoil selector를 사용한 비동기 처리

이번 에어비엔비(링크달자) 프로젝트를 진행하면서 React의 상태관리 라이브러리인 Recoil을 활용했다.

Recoil을 활용하면 context처럼 provider를 사용하지 않아도 전역에서 상태를 관리할 수 있다. 또한 최적화도 잘되어 있기 때문에 상태를 업데이트해도 상태를 사용하는 컴포넌트에서만 렌더링이 가능하다. 

기존의 훅으로만 진행했을 때 상위에 존재하는 상태가 변경될 때 memo처리를 해주지 않은 모든 하위 컴포넌트들이 리렌더링 되는 것을 recoil을 활용해서 최적화 시킬 수 있다. 

간단하게 recoil에 대한 장점을 작성했는데 이제 본론인 selector를 활용해 비동기 처리 하는 방법을 알아보자. 

github의 repository의 star개수를 가져오는 간단한 프로그램으로 이해해보자!

codeSandbox에 간단한 예제로 진행했으며 아래 링크와 결과가 있다. 

<iframe src="https://codesandbox.io/embed/unruffled-kare-jdhjf?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="unruffled-kare-jdhjf"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



![React App (1)](D:\Downloads\React App (1).gif)

---



## selector에서 기본 get 요청

selector에서 기본적인 비동기 요청은 매우 간단하다. 

아래의 코드의 `atom`과 `selector`는 아래와 같다.

- `githubInfoState`: input으로 부터 Github User와 Repository정보를 받아서 저장하는 상태이다. 
- `getStars`:  `githubInfoState`로부터 Github User와 Repository정보를 `get` 해와서 Github에 get요청을 한뒤에 star 개수를 반환해주는 selector.

아래의 코드처럼 단순히 get함수에 `async`함수를 넣어서 사용하는 컴포넌트에서 `useRecoilValue`해서 값을 가져오면된다.

아래의 코드는 `githubInfoState`의 상태를 가져와서 사용하기 때문에 `githubInfoState`의 **상태가 변경 될 때마다 다시 Get 요청을 해서 새로운 값을 가져온다. ** 

- recoil 상태

```javascript
export const githubInfoState = atom({
  key: "githubInfomation",
  default: { users: "", repo: "" }
});

export const getStars = selector({
  key: "get/github-repo-stars",
  get: async ({ get }) => {
    const { users, repo } = get(githubInfoState);
    if (!users || !repo) return;
    const url = `https://api.github.com/repos/${users}/${repo}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.stargazers_count;
    } catch (err) {
      throw Error("잘못된 깃허브 정보입니다!");
    }
  }
});

```

- getStars 를 사용하는 컴포넌트

```jsx
const Stars = () => {
  const userRepoStars = useRecoilValue(getStars);

  const stars = userRepoStars ? `${userRepoStars} 개` : "";
  return <StyledStars>{stars}</StyledStars>;
};
```

이제 위와 같이 작성하면 제출하기를 클릭해서 `githubInfoState`의 상태가 변경됨에 따라서 자동으로 `Stars` 컴포넌트의 값이 변경된다. 

### Suspense

위의 결과를 잘보면 값이 나오기전 loading... 이라는 표시가 보일 것이다. 리액트에서 개발한 라이브러리여서 리액트와 연동이 잘돼있다. 리액트의 `Concurrent Mode`의 `Suspense`를 사용할 수 있다. 

`Suspense` 라는 것은 간단히 설명하면 하위 컴포넌트의 비동기 작업이 완료되지 않았을 때 `Suspense의 fallback`에 있는 스트링 혹은 컴포넌트 등을 대신 렌더링하는 것이다. 비동기 작업이 완료되면 원래 렌더링해야 되는 컴포넌트가 렌더링 된다. 

위의 샌드박스코드에서 아래와 같이 `Suspense`를 적용했기 때문에 loading이라는 표시를 확인할 수 있다.  

```jsx
const App = () => {
    ...
    return (
        ...
        <Suspense fallback={<div className="stars">loading...</div>}>
            <Stars className="stars" />
        </Suspense>
        ...
    )
}
```

>  recoil의 `selector`는 `get함수`가 `async`함수 일 때 `Suspense`를 필수적으로 작성하게 한다. 그렇기 때문에 로딩처리를 생각하지않고 `Suspense`에서 간단하게 할 수 있다. 

---

## 또 다른 Recoil selector에서 비동기 처리를 할 때의 장점

Recoil의 `selector`를 활용해서 비동기처리를 했을 때 엄청난 장점이 있다. 바로 값을 캐싱해놓는다는 것이다. 

어떻게??

`selecto의 key`값과 get해서 사용하는 `atom의 state`값을 비교해서 이전에 같은 데이터로 fetch한 것이 있다면 cache에서 바로 처리한다. 아래의 사진을 보면 이해된다. 



- 3번의 요청을 보낸 상태

![image-20210604234817330](C:\Users\송하영\AppData\Roaming\Typora\typora-user-images\image-20210604234817330.png)

- 첫번째 get 요청

![image-20210604234840714](C:\Users\송하영\AppData\Roaming\Typora\typora-user-images\image-20210604234840714.png)

- 2번째 get 요청 **from disk cache 라는 글이 보인다.**

![image-20210604235127138](C:\Users\송하영\AppData\Roaming\Typora\typora-user-images\image-20210604235127138.png)



---

간단하게 selector로 비동기처리하는 과정을 알아보았다. 자세한 코드는 위의 codesandbox에서 코드를 보면 쉽게 이해될 것이다. 

selector뿐만 아니라 인자를 받을 수 있는 `selectorFamily`같은 메소드도 있다. 

타입스크립트를 사용하면서 `selectorFamily`의 인자의 타입 때문에 문제가 발생했었는데 이 문제는 다음에 포스팅할 예정이다.

recoil을 사용해서 편하게 비동기처리와 로딩, 에러 처리를 해보자!