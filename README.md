## 과제 체크포인트

### 배포 링크
https://front-5th-chapter-1-3.netlify.app/
<!--
배포 링크를 적어주세요
예시: https://<username>.github.io/front-5th-chapter1-1/

배포가 완료되지 않으면 과제를 통과할 수 없습니다.
배포 후에 정상 작동하는지 확인해주세요.
-->

### 기본과제

- [x] shallowEquals 구현 완료
- [x] deepEquals 구현 완료
- [x] memo 구현 완료
- [x] deepMemo 구현 완료
- [x] useRef 구현 완료
- [x] useMemo 구현 완료
- [x] useDeepMemo 구현 완료
- [x] useCallback 구현 완료

### 심화 과제

- [x] 기본과제에서 작성한 hook을 이용하여 렌더링 최적화를 진행하였다.
- [x] Context 코드를 개선하여 렌더링을 최소화하였다.

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장
<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->

💡 **React.FC 알아보기**
다른 분들 코드에서 어떤 컴포넌트는 이렇게 쓰고:
```
export const MyComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
```
어떤 컴포넌트는 이렇게 쓰는 걸 보고:
```
type Props = { children: React.ReactNode };

export function MyComponent({ children }: Props) {
  return <div>{children}</div>;
}
```
궁금해서 두 방식의 차이를 조사해봤습니다.

📌 **알게 된 점**
React.FC는 children이 자동 포함되어 있고, 반환값이 ReactElement라는 걸 명시해줍니다.
하지만 다음과 같은 이유로 명시적 타입 선언이 더 추천되는 흐름이라는 걸 알게 됐습니다:

🔍 **React.FC의 단점**
- children이 암묵적으로 포함되기 때문에 props 구조가 덜 명확함
- 제네릭 사용 시 타입 추론이 어려움
- 일부 경우에 defaultProps 타입 추론 문제가 발생함
- eact 공식 커뮤니티나 타입스크립트 치트시트에서도 React.FC 사용은 지양하는 흐름
  🔗 관련 문서: React TypeScript Cheatsheet - Do Not Use React.FC

✅ **그래서 이렇게 쓰기로 결정했습니다.**
```
type Props = { children: React.ReactNode };

export const MyComponent = ({ children }: Props) => {
  return <div>{children}</div>;
};
```
props 구조를 명확하게 보여줄 수 있고, 타입 유연성도 좋고,유지보수 측면에서도 더 깔끔하게 느껴졌습니다.



### 코드 품질
<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->
- 코드 구조를 준일 코치님이 말씀해 주신 '응집도'를 높이는 방향으로 만들어보려고 했습니다.
  - 기존에는 utils에 타입들을 별도로 뺐는데, 그렇게하면 context부분을 볼 때 utils 폴더로 이동을 해야하는 번거로움이 있고, 다른 context들의 type과 섞에 어디서 사용되는지 불분명하다고 느껴졌습니다.
  - 그래서 context 폴더 안에 item / notification / theme / user 폴더를 배치하고, 그 안에 각각 index.tsx, provider.tsx, 그리고 타입이 있을 경우 types.ts를 추가하였습니다.
  - index.tsx
    - 컨텍스트의 진입점 역할
    - 컨텍스트 객체와 관련 훅을 내보내는 역할
  - provider.tsx
    - 컨텍스트의 실제 Provider 컴포넌트를 정의
    - 컨텍스트의 상태와 로직을 관리
    - 자식 컴포넌트들에게 컨텍스트 값을 제공
```
📦src
 ┣ 📂@lib
 ┃ ┣ 📂equalities
 ┃ ┃ ┣ 📜deepEquals.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜shallowEquals.ts
 ┃ ┣ 📂hocs
 ┃ ┃ ┣ 📜deepMemo.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜memo.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜useCallback.ts
 ┃ ┃ ┣ 📜useDeepMemo.ts
 ┃ ┃ ┣ 📜useMemo.ts
 ┃ ┃ ┗ 📜useRef.ts
 ┃ ┗ 📜index.ts
 ┣ 📂__tests__
 ┃ ┣ 📜advanced.test.tsx
 ┃ ┗ 📜basic.test.tsx
 ┣ 📂components
 ┃ ┣ 📜complexForm.tsx
 ┃ ┣ 📜header.tsx
 ┃ ┣ 📜itemList.tsx
 ┃ ┣ 📜notificationSystem.tsx
 ┃ ┗ 📜themedBackground.tsx
 ┣ 📂context
 ┃ ┣ 📂item
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜provider.tsx
 ┃ ┣ 📂notification
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜provider.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂theme
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜provider.tsx
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜provider.tsx
 ┃ ┃ ┗ 📜types.ts
 ┃ ┗ 📜providers.tsx
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┣ 📜setupTests.ts
 ┣ 📜utils.ts
 ┗ 📜vite-env.d.ts
```


### 학습 효과 분석
<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->
✅ 직접 구현하며 배운 점
- memo, deepMemo 차이는 단순히 비교 함수만 다름 → shallowEquals, deepEquals만 바꿔 끼우면 확장 가능
- useMemo와 useCallback의 내부 동작은 거의 같고, 둘 다 deps 변경 여부만 기준으로 캐싱 여부를 결정함
  → 차이는 단지 반환값이 일반 값인지 함수인지의 차이일 뿐
- DependencyList는 사실상 그냥 any[] 배열인데, 이를 통해 의존성이 변했는지 체크해 캐싱 로직 실행여부를 결정한다는 걸 체감
- memo나 useMemo를 막연히 "최적화용"이라 생각했는데, 구체적으로 언제 렌더링이 발생하는지 / 안 하는지를 판단할 수 있게 됨
  - memo: 이전 props와 현재 props를 비교해서 같으면 리렌더링을 막고, 다르면 다시 렌더링함
  - useMemo: deps 배열이 이전과 같으면 캐시된 값을 반환하고, 다르면 다시 factory()를 실행해서 새 값을 계산함
 
---
### **💡 재귀 타입**
- DeepComparable은 JSON 재귀적으로 표현한 타입입니다.
- 이미지에 나온 타입들이 모두 포함됩니다.
![carbon](https://github.com/user-attachments/assets/056f3701-3fcc-43db-82d5-1328ea03b9d2)

### **✅ 도입 이유**
- 중첩된 구조를 비교하려면 타입이 자기 자신을 참조하는 재귀 구조여야 합니다.
- unknown이나 any로 처리하면 타입 안전성과 자동완성 등의 TypeScript의 장점을 잃게 됩니다.
- 명시적 재귀 타입 정의로 deepEquals의 비교 대상이 되는 구조를 정확하게 제한하고 보장할 수 있습니다.

---

### 💡 **hasOwnProperty.call() 사용 이유**
- 처음에는 includes를 사용했습니다.
`keysB.includes(key)`
- 이 방식은 배열에 특정 문자열이 포함되어 있는지를 확인하는 용도로는 충분하지만, 객체가 해당 키를 실제로 "소유하고 있는지" 까지는 보장하지 못합니다. 예를 들어, 프로토타입 체인을 통해 상속된 키도 includes에는 영향을 줄 수 있습니다.
`const parent = { greeting: "hello" };
const child = Object.create(parent); // 부모를 상속받은 객체
console.log(child.greeting); // 👉 "hello"
console.log(child.hasOwnProperty("greeting")); // ❌ false
`

### ✅ **개선 방식**
- 더 안전하게 비교하기 위해 hasOwnProperty 메서드를 사용하도록 변경했습니다
`objB.hasOwnProperty(key)`
- 하지만 이 방식도 문제가 있을 수 있습니다:
1. Object.create(null) 로 생성되어 hasOwnProperty를 상속받지 않을 수 있음
2. 메서드가 오버라이드되어 신뢰할 수 없는 경우가 있음
`const obj = {
  hasOwnProperty: () => false,
  key: "value",
};
console.log(obj.hasOwnProperty("key")); // ❌ 항상 false`

### ✅ **최종 개선 방식**
- 원래 Object의 prototype 메서드를 직접 호출하는 Object.prototype.hasOwnProperty.call() 방식으로 최종 수정하였습니다.
`Object.prototype.hasOwnProperty.call(objB, key)`
