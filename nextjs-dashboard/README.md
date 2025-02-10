## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

---

### Folder structure

- /app: 애플리케이션의 모든 경로, 구성 요소 및 로직이 포함되어 있으며 대부분 이곳에서 작업하게 됩니다. 
- /app/lib: 재사용 가능한 유틸리티 함수 및 데이터 가져오기 함수 등 애플리케이션에서 사용되는 함수가 포함됩니다.
- /app/ui: 카드, 표, 양식 등 애플리케이션의 모든 UI 구성 요소가 포함되어 있습니다. 시간을 절약하기 위해 이러한 구성 요소는 미리 스타일이 지정되어 있습니다.
- /public: 이미지와 같은 애플리케이션의 모든 정적 에셋을 포함합니다.
- 구성 파일: 애플리케이션의 루트에는 next.config.ts와 같은 구성 파일도 있습니다. 이러한 파일의 대부분은 create-next-app을 사용하여 새 프로젝트를 시작할 때 생성되고 미리 구성됩니다. 이 과정에서는 이러한 파일을 수정할 필요가 없습니다.

### Placeholder Data

사용자 인터페이스를 구축할 때는 플레이스홀더 데이터가 있으면 도움이 됩니다. 데이터베이스나 API를 아직 사용할 수 없는 경우에는 사용할 수 있습니다:

- 플레이스홀더 데이터를 JSON 형식 또는 JavaScript 객체로 사용합니다.
- Use a 3rd party service like [mockAPI](https://mockapi.io/).

이 프로젝트의 경우 app/lib/placeholder-data.ts에 플레이스홀더 데이터를 제공했습니다. 파일의 각 JavaScript 객체는 데이터베이스의 테이블을 나타냅니다. 예를 들어 송장 테이블을 예로 들어보겠습니다:
```javascript
const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  // ...
];
```
데이터베이스 설정([setting up your database](https://nextjs.org/learn/dashboard-app/setting-up-your-database)) 장에서는 이 데이터를 사용하여 데이터베이스를 시드(초기 데이터로 채우기)합니다.

---

### CSS Styling

global.css 를 정의하고, *Layout.tsx 에 정의해 레이아웃 별 스타일을 별도로 가져갈 수 있을 것으로 보인다.

본 프로젝트에서는 tailwind 지시어를 사용해 스타일 지정하는 코드도 있는데, FrontEnd 개발자가 없는 상황에서는 CSS를 활용하는 것이 더 바람직해 보인다.
```javascript
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
export default function Page() {
  return (
    // These are Tailwind classes:
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    // ...
  )
}
```

---

### Optimizing Fonts and Images

### Why optimize fonts?

글꼴은 웹사이트 디자인에서 중요한 역할을 하지만 프로젝트에서 사용자 정의 글꼴을 사용하면 글꼴 파일을 가져와 로드해야 하는 경우 성능에 영향을 줄 수 있습니다.

누적 레이아웃 이동([Cumulative Layout Shift](https://vercel.com/blog/how-core-web-vitals-affect-seo))은 Google에서 웹사이트의 성능과 사용자 경험을 평가하는 데 사용하는 지표입니다. 글꼴의 경우 레이아웃 이동은 브라우저가 처음에 폴백 또는 시스템 글꼴로 텍스트를 렌더링한 다음 로드된 후 사용자 지정 글꼴로 교체할 때 발생합니다. 이 교체로 인해 텍스트 크기, 간격 또는 레이아웃이 변경되어 주변의 요소가 이동할 수 있습니다.

Next.js는 next/font 모듈을 사용할 때 애플리케이션의 글꼴을 자동으로 최적화합니다. 빌드 시점에 글꼴 파일을 다운로드하여 다른 정적 에셋과 함께 호스팅합니다. 즉, 사용자가 애플리케이션을 방문할 때 성능에 영향을 줄 수 있는 글꼴에 대한 추가 네트워크 요청이 없습니다.

(다른 정적 자산과 함께 글꼴 파일을 호스팅하므로 추가 네트워크 요청이 발생하지 않습니다.)

**Adding a primary font**

- `<body>` 에 폰트를 설정하면 모든 애플리케이션에 적용됩니다. (app/layout.tsx)

**Practice: Adding a secondary font**

- 필요한 요소마다 별도의 폰트 적용도 가능하다. (app/page.tsx, app/ui/acme-logo.tsx)

### Why optimize images?

이미지를 정적 에셋으로 관리할 수 있지만 아래와 같은 요구사항을 수동으로 처리해야한다.

- Ensure your image is responsive on different screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift as the images load.
- Lazy load images that are outside the user's viewport.
  
___이미지 최적화는 그 자체로 하나의 전문 분야라고 할 수 있을 정도로 웹 개발에서 큰 주제입니다. 이러한 최적화를 수동으로 구현하는 대신 next/image 컴포넌트를 사용하여 이미지를 자동으로 최적화할 수 있습니다.___

- Doc: [이미지 최적화에 대한 추가적인 문서](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#recommended-reading)

---

### Creating Layouts and Pages

<Layout /> 컴포넌트는 자식 프로퍼티를 받습니다. 이 자식은 페이지 또는 다른 레이아웃일 수 있습니다. 귀하의 경우, /dashboard 내부의 페이지는 다음과 같이 <Layout /> 안에 자동으로 중첩됩니다:

```
app/
  dashboard/
  - layout.tsx  <- 대시보드 레이아웃
  - page.tsx
    customers/
    - page.tsx
    invoices/
    - page.tsx
- layout.tsx    <- 루트 레이아웃
- page.tsx
```

Next.js에서 레이아웃을 사용할 때의 한 가지 이점은 탐색 시 페이지 컴포넌트만 업데이트되고 레이아웃은 다시 렌더링되지 않는다는 것입니다. 이를 부분 렌더링이라고 하며, 페이지 간 전환 시 레이아웃에서 클라이언트 측 React 상태를 유지합니다.

app/layout.tsx 를 루트 레이아웃이라고 하며 모든 Next.js 애플리케이션에 필요합니다. 루트 레이아웃에 추가하는 모든 UI는 애플리케이션의 모든 페이지에서 공유됩니다. 루트 레이아웃을 사용하여 <html> 및 <body> 태그를 수정하고 메타데이터를 추가할 수 있습니다(메타데이터에 대한 자세한 내용은 이후 장에서 설명합니다).

/app/dashboard/layout.tsx 대시보드 페이지에 고유하므로 위의 루트 레이아웃에 UI를 추가할 필요가 없습니다.