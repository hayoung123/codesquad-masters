# react-router-dom 히스토리API 이용해서 구현하기

window.history API를 이용해서 react-router-dom의 기본 컴보넌트들을 만들어봤다. 

- Router
- Link
- Route



## 핵심 로직

### Router

- `Router`에 `currentPath`라는 상태를 두고 `context`를 이용해서 하위에 있는 `Link`와 `Route`가 사용하는 것이다. 
- 뒤로가기 버튼은[ window.onpopstate](https://developer.mozilla.org/ko/docs/Web/API/WindowEventHandlers/onpopstate ) 이벤트 핸들러를 사용했다. 

### Link

- history API의 `pushState`를 해서 history에 push하면서 url path를 변경시켜준다. 
-  `props.to`를 `useContext`를 이용해서 가져온 `setCurrentPath`해준다. 

### Route

- `useContext`를 이용해서 가져온 `setCurrent`와 `props.path`를 비교해서 렌더링해준다.

## Code

```jsx
mport React, { useState, useContext, useEffect } from "react";

const HistoryContext = React.createContext();

export const Router = ({ children }) => {
  const DEFAULT_PATH = "/";
  const [currentPath, setCurrentPath] = useState();
  useEffect(() => {
    setCurrentPath(DEFAULT_PATH);
    window.onpopstate = function (e) {
      e.state ? setCurrentPath(e.state?.page.to) : setCurrentPath(DEFAULT_PATH);
    };
  }, []);
  return (
    <HistoryContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const Link = ({ to, children }) => {
  const { currentPath, setCurrentPath } = useContext(HistoryContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (currentPath === to) return;
    setCurrentPath(to);
    window.history.pushState({ page: { to } }, to, to);
  };
  return (
    <a href="" onClick={handleClick}>
      {children}
    </a>
  );
};

export const Route = ({ children, exact, path }) => {
  const { currentPath } = useContext(HistoryContext);
  if (exact && currentPath !== path) return null;

  if (currentPath?.includes(path)) return children;
  else return null;
};
```

