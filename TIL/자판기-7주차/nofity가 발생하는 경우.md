# notify가 발생하는 경우

model에서 상태가 변경이 됐을 경우 구독하고 있는 view한테 notify한다.

## wallet model

#### wallet model을 구독하고 있는 view

- wallet View

#### 구독하고 있는 view에게 notify 해주는 경우

- 지갑의 돈이 증가할 경우 
- 지갑의 돈이 감소할 경우

## process model

#### process model을 구독하고 있는 view

- process view

- product view

#### 구독하고 있는 view에게 notify 해주는 경우

- 자판기 돈이 증가할 경우
- 자판기 돈이 감소할 경우

## product model

#### product model을 구독하고 있는 view

- product view

#### 구독하고 있는  view에게 notify 해주는 경우

- 재고가 0이 됐을 때

## log model

#### log model을 구독하고 있는 view

- log view

#### 구독하고 있는  view에게 notify 해주는 경우

- log가 추가된 경우

