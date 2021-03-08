# 간단한 나만의 Promise 객체 만들기

JS에 있는 Promise와 비슷하게 작동하는 MyPromise를 만들어봤다. 완벽하게 똑같이는 아직 내실력으로는 절대 불가능...했다. 최대한 내가 아는 기능들만 비슷하게 나오도록 해보자라는 생각으로 구현했다. 

## 구현하고 싶은 기능?

아래의 기능들이 정상작동하는 것을 목표로 두고 구현했다. 

- resolve한 값이 then을 통해 체이닝 된다.

  test. 1-> 2-> 3 -> 최종 3 출력

  ```javascript
  new Promise((resolve)=>{
      resolve(1)
  })
      .then(v=>v+1)
      .then(v=>v+1)
      .then(console.log)
  ```

- Promise의 콜백함수에서 비동기 처리가 가능하게 한다. 

  test. 1초 뒤에 1이 출력

  ```javascript
  new Promise((resolve)=>{
      setTimeout(()=>{
          resolve(1)
      },1000)
  }).then(console.log)
  ```

- Promise의 콜백함수를 비동기가 아니지만 resolve또는 reject 및 이후 then,catch는 비동기로 진행  

  test. one -> two -> three -> resolve is async 순서대로 출력

  ```javascript
  console.log('one')
  new Promise((resolve)=>{
      resolve('resolve is async?')
      console.log('two')
  }).then(console.log)
  console.log('three')
  ```

- reject가 됐을 시 catch 처리

  test. reject is work 출력

  ```javascript
  new Promise((resolve, reject) => {
    reject('reject is work');
    resolve(1);
  })
    .then((v) => v + 1)
    .then(log)
    .catch(log);
  ```

- reject가 됐을 시 catch처리후 뒤에 then이 있으면 이어서 처리

  test. reject is work / catch is working 출력

  ```javascript
  new Promise((resolve, reject) => {
    reject('reject is work');
    resolve(1);
    console.log(11);
  })
    .then((v) => v + 1)
    .then(log)
    .catch((v) => v + ' / catch is working')
    .then(log);
  ```

- resolve가 됐을 시 아래 reject가 나와도 무시 (반대의 경우도 가능하게)

  test. 2 => 4 출력

  ```javascript
  new Promise((resolve, reject) => {
    resolve(1);
    reject('reject is work');
  })
    .then((v) => v + 1)
    .then((v) => {
      log(v);
      return v + 2;
    })
    .catch((v) => v + ' / catch is working')
    .then(log);
  ```

## 구현한 MyPromise

- `then`, `catch`는 this를 반환하게 해서 메소드 체이닝이 가능하게 만들었다. 

- `resolve`, `reject` 는 비슷하게 나마 구현하기 위해 `setTimeout`을 이용해서 비동기로 처리 하게 했다. - 비록 `setTimeout`으로 구현했기 때문에 마이크로테스크 큐는 아니지만 비동기 처럼 진행하게 하기위해서 `setTimeout`을 사용했다.
- 상태를 두고 비교를 해 `then`, `catch` 를 상황에 맞게 처리하도록 했다. 

일단 전체 코드를 작성하고 몇가지 메소드들만 자세히 보자.

### 전체 CODE

```javascript
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  constructor(fn) {
    this.cbList = [];
    this.errCb = null;
    this.status = STATUS.PENDING;
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(cb) {
    this.cbList.push(cb);
    return this;
  }
  catch(cb) {
    if (this.isStatus(STATUS.REJECTED) && !this.errCb) {
      this.errCbList = cb;
      this.cbList = [];
    }
    return this;
  }
  resolve(value) {
    if (!this.isStatus(STATUS.REJECTED)) {
      this.setStatus(STATUS.FULFILLED);
      setTimeout(() => {
        if (!this.isStatus(STATUS.REJECTED)) {
          pipe(...this.cbList)(value);
        }
      }, 0);
    }
    return this;
  }
  reject(value) {
    if (!this.isStatus(STATUS.FULFILLED)) {
      this.setStatus(STATUS.REJECTED);
      setTimeout(() => {
        if (!this.errCbList) throw Error('UnhandledPromiseRejectionWarning:', value);
        else if (!this.cbList.length) pipe(this.errCbList)(value);
        else if (this.cbList.length) pipe(this.errCbList, ...this.cbList)(value);
      }, 0);
    }
    return this;
  }
  setStatus(status) {
    this.status = status;
  }
  isStatus(status) {
    return this.status === status;
  }
}
```

중간 사용된 메소드 및 함수에 대해서 알아보자. 

### 메소드



#### then, catch

위에서 말했듯이 메소드체이닝을 위해서 then을 반환한다. 

- `then`

  `then`은 배열에 인자로 받은 함수를 넣어준다. 

- `catch`

  `catch`는 reject가 실행돼 status가 'rejected'로 변경 됐을 때만 로직이 작동한다. errCb에 인자로 받은 함수를 넣고 cbList를 초기화한다. 왜냐면 이전에 받은 then은 reject됐기 때문에 다 건너뛰게 된다. 
  
  또한 catch가 2번 나올 시 앞에있는 catch만 동작하고 뒤에있는 catch는 무시하게 하기 위해서 errCb가 null일 때만 위의 작업을 실행한다. 




### resolve,catch

- **resolve**

입력받은 인자값을 cbList에 있는 함수들에 앞에서부터 차례대로 넣어서 실행한다.  

`resolve`는 비동기로 실행돼야 한다. why? 

동기로 작동하는 then 또는 catch에 의해 cbList, errCb가 먼저 채워지게 되고 비동기로 실행된 `resolve`는 채워진 cbList를 참조하여 결과값을 도출해 낸다. 

아래와 같은 경우에는 reject가 먼저 실행됐기 때문에 resolve가 실행되면 안되기 때문에 상태를 비교해 처리해준다. (`!this.isStatus(STATUS.REJECTED))`)

```javascript
new MyPromise((resolve,reject)=>{
    reject('거절됨');
    resolve(1)
})
```

- **catch**

`catch`도 resolve와 동작과정을 똑같다. 단, 한 부분만 다르다.

reject가 실행되면 catch로 이어지게 된 후 그 뒤에 있는 then은 정상적으로 실행된다. 즉, cbList에 함수들이 있다면 errCbList에 있는 함수들을 처리 후 cbList에 있는 함수들도 이어서 처리해줘야 한다. 

그렇기 때문에 아래 처럼 각 상황에 맞는 함수를 처리해줘야한다.

- catch가 없을 때 (errCb===null)

  -> 에러핸들링이 되지 않았다는 에러를 throw

- catch는 있지만 그 뒤에 then이 없을 때 (errCb!==null cbList는 비었을 때)

  -> errCb만 실행해준다. 

- catch도 있고 그 뒤에 then도 있을 때 (errCbList, cbList 둘 다 있을 때)

  -> errCbList, cbList 순서대로 실행해준다.

```javascript
if (!this.errCbList.length) throw Error('UnhandledPromiseRejectionWarning:', value);
else if (!this.cbList.length) pipe(...this.errCbList)(value);
else if (this.cbList.length) pipe(...this.errCbList, ...this.cbList)(value);
```



## 느낀점

이번에 Promise를 비슷하게 구현하는 MyPromise를 구현하면서 Promise동작에 대해 많이 배울 수 있었다. Promise의 단점도 알게됐는데 then에서 비동기 작업을 한다면 또다시 Promise객체를 생성해서 처리해줘야된다는 점이다. 이러한 불편한점을 해소하기 위해 async, await 가 나온 것 같다. 

아주 미흡하게 따라했음에도 promise에 대해 조금이나마 더 자세하게 알게 된 느낌이다. 