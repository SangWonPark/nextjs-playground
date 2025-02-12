## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard
application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

---

## Getting Started

### Folder structure

- /app: 애플리케이션의 모든 경로, 구성 요소 및 로직이 포함되어 있으며 대부분 이곳에서 작업하게 됩니다.
- /app/lib: 재사용 가능한 유틸리티 함수 및 데이터 가져오기 함수 등 애플리케이션에서 사용되는 함수가 포함됩니다.
- /app/ui: 카드, 표, 양식 등 애플리케이션의 모든 UI 구성 요소가 포함되어 있습니다. 시간을 절약하기 위해 이러한 구성 요소는 미리 스타일이 지정되어 있습니다.
- /public: 이미지와 같은 애플리케이션의 모든 정적 에셋을 포함합니다.
- 구성 파일: 애플리케이션의 루트에는 next.config.ts와 같은 구성 파일도 있습니다. 이러한 파일의 대부분은 create-next-app을 사용하여 새 프로젝트를 시작할 때 생성되고 미리 구성됩니다. 이
  과정에서는 이러한 파일을 수정할 필요가 없습니다.

### Placeholder Data

사용자 인터페이스를 구축할 때는 플레이스홀더 데이터가 있으면 도움이 됩니다. 데이터베이스나 API를 아직 사용할 수 없는 경우에는 사용할 수 있습니다:

- 플레이스홀더 데이터를 JSON 형식 또는 JavaScript 객체로 사용합니다.
- Use a 3rd party service like [mockAPI](https://mockapi.io/).

이 프로젝트의 경우 app/lib/placeholder-data.ts에 플레이스홀더 데이터를 제공했습니다. 파일의 각 JavaScript 객체는 데이터베이스의 테이블을 나타냅니다. 예를 들어 송장 테이블을 예로
들어보겠습니다:

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

데이터베이스 설정([setting up your database](https://nextjs.org/learn/dashboard-app/setting-up-your-database)) 장에서는 이 데이터를 사용하여
데이터베이스를 시드(초기 데이터로 채우기)합니다.

---

## CSS Styling

global.css 를 정의하고, *Layout.tsx 에 정의해 레이아웃 별 스타일을 별도로 가져갈 수 있을 것으로 보인다.

본 프로젝트에서는 tailwind 지시어를 사용해 스타일 지정하는 코드도 있는데, FrontEnd 개발자가 없는 상황에서는 CSS를 활용하는 것이 더 바람직해 보인다.

```typescript jsx
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
    return (
        // These are Tailwind classes:
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                // ...
            </div>
        </main>
    );
}
```

---

## Optimizing Fonts and Images

### Why optimize fonts?

글꼴은 웹사이트 디자인에서 중요한 역할을 하지만 프로젝트에서 사용자 정의 글꼴을 사용하면 글꼴 파일을 가져와 로드해야 하는 경우 성능에 영향을 줄 수 있습니다.

누적 레이아웃 이동([Cumulative Layout Shift](https://vercel.com/blog/how-core-web-vitals-affect-seo))은 Google에서 웹사이트의 성능과 사용자
경험을 평가하는 데 사용하는 지표입니다. 글꼴의 경우 레이아웃 이동은 브라우저가 처음에 폴백 또는 시스템 글꼴로 텍스트를 렌더링한 다음 로드된 후 사용자 지정 글꼴로 교체할 때 발생합니다. 이 교체로 인해 텍스트
크기, 간격 또는 레이아웃이 변경되어 주변의 요소가 이동할 수 있습니다.

Next.js는 next/font 모듈을 사용할 때 애플리케이션의 글꼴을 자동으로 최적화합니다. 빌드 시점에 글꼴 파일을 다운로드하여 다른 정적 에셋과 함께 호스팅합니다. 즉, 사용자가 애플리케이션을 방문할 때
성능에 영향을 줄 수 있는 글꼴에 대한 추가 네트워크 요청이 없습니다.

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

___이미지 최적화는 그 자체로 하나의 전문 분야라고 할 수 있을 정도로 웹 개발에서 큰 주제입니다. 이러한 최적화를 수동으로 구현하는 대신 next/image 컴포넌트를 사용하여 이미지를 자동으로 최적화할 수
있습니다.___

- Doc: [이미지 최적화에 대한 추가적인 문서](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#recommended-reading)

---

## Creating Layouts and Pages

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

Next.js에서 레이아웃을 사용할 때의 한 가지 이점은 탐색 시 페이지 컴포넌트만 업데이트되고 레이아웃은 다시 렌더링되지 않는다는 것입니다. 이를 부분 렌더링이라고 하며, 페이지 간 전환 시 레이아웃에서 클라이언트
측 React 상태를 유지합니다.

app/layout.tsx 를 루트 레이아웃이라고 하며 모든 Next.js 애플리케이션에 필요합니다. 루트 레이아웃에 추가하는 모든 UI는 애플리케이션의 모든 페이지에서 공유됩니다. 루트 레이아웃을
사용하여 <html> 및 <body> 태그를 수정하고 메타데이터를 추가할 수 있습니다(메타데이터에 대한 자세한 내용은 이후 장에서 설명합니다).

/app/dashboard/layout.tsx 대시보드 페이지에 고유하므로 위의 루트 레이아웃에 UI를 추가할 필요가 없습니다.

---

## Navigating Between Pages

__Why optimize navigation?__

To link between pages, you'd traditionally use the `<a>` HTML element. At the moment, the sidebar links use `<a>`
elements, but notice what happens when you navigate between the home, invoices, and customers pages on your browser.

Did you see it?

There's a full page refresh on each page navigation!

#### The `<Link>` component

#### _Automatic code-splitting and prefetching_

탐색 환경을 개선하기 위해 Next.js는 경로 세그먼트별로 애플리케이션을 자동으로 코드 분할합니다. 이는 브라우저가 초기 페이지 로드 시 모든 애플리케이션 코드를 로드하는 기존의 React SPA와는 다릅니다.

경로별로 코드를 분할하면 페이지가 격리됩니다. 특정 페이지에서 오류가 발생해도 나머지 애플리케이션은 계속 작동합니다. 또한 브라우저에서 구문 분석할 코드가 줄어들어 애플리케이션의 속도가 빨라집니다.

또한 프로덕션 환경에서 <링크> 컴포넌트가 브라우저의 뷰포트에 표시될 때마다 Next.js는 링크된 경로의 코드를 백그라운드에서 자동으로 프리피치합니다. 사용자가 링크를 클릭할 때쯤이면 대상 페이지의 코드가 이미
백그라운드에서 로드되어 있으므로 페이지 전환이 거의 즉각적으로 이루어집니다!

내비게이션 작동 방식에 대해 자세히 알아보세요.

---

## Fetching Data

__Database queries__

- 풀스택 애플리케이션을 만들 때는 데이터베이스와 상호 작용하는 로직도 작성해야 합니다. Postgres와 같은 관계형 데이터베이스의 경우 SQL 또는 ORM을 사용하여 이 작업을 수행할 수 있습니다.

데이터베이스 쿼리를 작성해야 하는 경우가 몇 가지 있습니다:

- API 엔드포인트를 만들 때는 데이터베이스와 상호 작용하는 로직을 작성해야 합니다.
- React 서버 컴포넌트(서버에서 데이터 불러오기)를 사용하는 경우 API 계층을 건너뛰고 데이터베이스 비밀을 클라이언트에 노출할 위험 없이 데이터베이스를 직접 쿼리할 수 있습니다.

__서버 컴포넌트를 사용하여 데이터 가져오기__

기본적으로 Next.js 애플리케이션은 React 서버 컴포넌트를 사용합니다. 서버 컴포넌트로 데이터를 가져오는 것은 비교적 새로운 접근 방식이며, 이를 사용하면 몇 가지 이점이 있습니다:

- 서버 컴포넌트는 기본적으로 데이터 불러오기와 같은 비동기 작업에 대한 솔루션을 제공하는 JavaScript Promises를 지원합니다. `useEffect`, `useState` 또는 기타 데이터 불러오기
  라이브러리 없이도 `async`/`await` 구문을 사용할 수 있습니다.
- 서버 컴포넌트는 서버에서 실행되므로 값비싼 데이터 가져오기 및 로직을 서버에 보관하고 결과만 클라이언트로 전송할 수 있습니다.
- 서버 컴포넌트는 서버에서 실행되므로 추가 API 계층 없이 데이터베이스를 직접 쿼리할 수 있습니다. 따라서 추가 코드를 작성하고 유지 관리할 필요가 없습니다.

__Using SQL__

대시보드 애플리케이션의 경우 `postgres.js` 라이브러리와 SQL을 사용하여 데이터베이스 쿼리를 작성하게 됩니다. SQL을 사용하는 데에는 몇 가지 이유가 있습니다:

- SQL은 관계형 데이터베이스 쿼리를 위한 업계 표준입니다(예: ORM은 내부적으로 SQL을 생성합니다).
- SQL에 대한 기본적인 이해가 있으면 관계형 데이터베이스의 기본을 이해하는 데 도움이 되어 다른 도구에 지식을 적용할 수 있습니다.
- SQL은 다용도로 사용할 수 있어 특정 데이터를 가져오고 조작할 수 있습니다.
- `postgres.js` 라이브러리는 SQL 인젝션에 대한 보호 기능을 제공합니다.

---

## Static and Dynamic Rendering

### What is Static Rendering?

정적 렌더링을 사용하면 빌드 시(배포할 때) 또는 [데이터 재검증](https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering) 시 서버에서 데이터
가져오기 및 렌더링이 이루어집니다.

사용자가 애플리케이션을 방문할 때마다 캐시된 결과가 제공됩니다. 정적 렌더링에는 몇 가지 이점이 있습니다:

- **더 빠른 웹사이트** - 미리 렌더링된 콘텐츠를 Vercel과 같은 플랫폼에 배포하면 캐싱하여 전 세계에 배포할 수 있습니다. 이를 통해 전 세계 사용자가 웹사이트의 콘텐츠에 더 빠르고 안정적으로 액세스할 수
  있습니다.
- **서버 부하 감소** - 콘텐츠가 캐시되므로 서버가 각 사용자 요청에 대해 콘텐츠를 동적으로 생성할 필요가 없습니다. 따라서 컴퓨팅 비용을 절감할 수 있습니다.
- **SEO** - 미리 렌더링된 콘텐츠는 페이지가 로드될 때 이미 콘텐츠를 사용할 수 있으므로 검색 엔진 크롤러가 색인을 생성하기가 더 쉽습니다. 이는 검색 엔진 순위 향상으로 이어질 수 있습니다.

정적 렌더링은 정적 블로그 게시물이나 제품 페이지와 같이 데이터가 없거나 사용자 간에 공유되는 데이터가 없는 UI에 유용합니다. 정기적으로 업데이트되는 개인화된 데이터가 있는 대시보드에는 적합하지 않을 수 있습니다.

### What is Dynamic Rendering?

동적 렌더링을 사용하면 요청 시(사용자가 페이지를 방문할 때) 각 사용자에 대한 콘텐츠가 서버에서 렌더링됩니다. 동적 렌더링에는 몇 가지 이점이 있습니다:

- **실시간 데이터** - 동적 렌더링을 사용하면 애플리케이션에서 실시간 또는 자주 업데이트되는 데이터를 표시할 수 있습니다. 데이터가 자주 변경되는 애플리케이션에 이상적입니다.
- **사용자별 콘텐츠** - 대시보드나 사용자 프로필과 같은 개인화된 콘텐츠를 제공하고 사용자 상호 작용에 따라 데이터를 업데이트하는 것이 더 쉬워집니다.
- **요청 시간 정보** - 동적 렌더링을 사용하면 쿠키 또는 URL 검색 매개변수와 같이 요청 시점에만 알 수 있는 정보에 액세스할 수 있습니다.

---

## [Streaming](https://nextjs.org/learn/dashboard-app/streaming)

이전 장에서는 Next.js의 다양한 렌더링 방법에 대해 배웠습니다. 또한 느린 데이터 가져오기가 애플리케이션의 성능에 어떤 영향을 미칠 수 있는지에 대해서도 설명했습니다. 느린 데이터 요청이 있을 때 사용자 환경을
개선할 수 있는 방법을 살펴보겠습니다.

### What is streaming?

스트리밍은 경로를 더 작은 '청크'로 나누고 준비되는 대로 서버에서 클라이언트로 점진적으로 스트리밍할 수 있는 데이터 전송 기술입니다.

스트리밍을 사용하면 느린 데이터 요청으로 인해 전체 페이지가 차단되는 것을 방지할 수 있습니다. 이를 통해 사용자는 모든 데이터가 로드될 때까지 기다리지 않고도 페이지의 일부를 보고 상호 작용할 수 있으며, UI가
사용자에게 표시될 수 있습니다.

스트리밍은 각 컴포넌트를 청크로 간주할 수 있기 때문에 React의 컴포넌트 모델에서 잘 작동합니다.

Next.js에서 스트리밍을 구현하는 방법에는 두 가지가 있습니다:

1. 페이지 수준에서 `loading.tsx` 파일(`<Suspense>`가 생성됨)을 사용합니다.
2. 컴포넌트 수준에서 `<Suspense>`를 사용하면 더욱 세밀하게 제어할 수 있습니다.

---

## [Partial Prerendering](https://nextjs.org/learn/dashboard-app/partial-prerendering)

지금까지 정적 렌더링과 동적 렌더링, 그리고 데이터에 따라 달라지는 동적 콘텐츠를 스트리밍하는 방법에 대해 알아보았습니다. 이 장에서는 정적 렌더링, 동적 렌더링, 스트리밍을 동일한 경로에서 부분 사전 렌더링(
PPR)으로 결합하는 방법에 대해 알아보겠습니다.

> 부분 미리 렌더링은 Next.js 14에 도입된 실험적 기능입니다. 이 페이지의 내용은 기능의 안정화가 진행됨에 따라 업데이트될 수 있습니다. PPR은 Next.js 카나리아 릴리스(next@canary)에서만
> 사용할 수 있으며 안정된 버전의 Next.js에서는 사용할 수 없습니다. 아직 프로덕션 환경에서 부분 사전 렌더링을 사용하는 것은 권장하지 않습니다.

### How does Partial Prerendering work?

부분 사전 렌더링은 이전 장에서 배운 React의 Suspense를 사용하여 특정 조건이 충족될 때까지(예: 데이터가 로드될 때까지) 애플리케이션의 일부 렌더링을 연기합니다.

서스펜스 폴백은 정적 콘텐츠와 함께 초기 HTML 파일에 임베드됩니다. 빌드 시(또는 재검증 시) 정적 콘텐츠가 미리 렌더링되어 정적 셸을 생성합니다. 동적 콘텐츠의 렌더링은 사용자가 경로를 요청할 때까지
연기됩니다.

컴포넌트를 서스펜스로 래핑하면 컴포넌트 자체가 동적이 되는 것이 아니라, 서스펜스가 정적 코드와 동적 코드 사이의 경계로 사용됩니다.

PPR과 Streaming 의 차이는 결국 정적(static) 요소가 build 시에 미리 생성되냐 아니면 런타임에 처리되냐에 있다.
> PPR:
> - 빌드 시점에 정적 부분을 미리 생성
> - 서버에서 동적 데이터를 처리
> - 더 나은 SEO 지원
> - 서버 리소스를 효율적으로 사용

> Component Streaming:
> - 모든 처리가 런타임에 발생
> - 클라이언트 사이드에서 더 많은 작업 처리
> - 서버 부하가 상대적으로 높을 수 있음

### [Implementing Partial Prerendering](https://nextjs.org/learn/dashboard-app/partial-prerendering#implementing-partial-prerendering)

Enable PPR for your Next.js app by adding the ppr option to your next.config.mjs file:

```typescript
// next.config.ts
import type { NextConfig } from 'next';
 
const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  }
};
 
export default nextConfig;
```

The 'incremental' value allows you to adopt PPR for specific routes.

Next, add the experimental_ppr segment config option to your dashboard layout:

```typescript
// /app/dashboard/layout.tsx
import SideNav from '@/app/ui/dashboard/sidenav';
 
export const experimental_ppr = true;
 
// ...
```

---

## 현재까지의 작업 요약

To recap, you've done a few things to optimize data fetching in your application so far:

1. Created a database in the same region as your application code to reduce latency between your server and database.
2. Fetched data on the server with React Server Components. This allows you to keep expensive data fetches and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.
3. Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request and the amount of JavaScript needed to transform the data in-memory.
4. Parallelize data fetching with JavaScript - where it made sense to do so.
5. Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user to start interacting with the UI without waiting for everything to load.
6. Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic.

In the next chapter, we'll look at two common patterns you might need to implement when fetching data: search and pagination.

---

## Adding Search and Pagination

이전 장에서는 스트리밍을 통해 대시보드의 초기 로딩 성능을 개선했습니다. 이제 `/invoices` 페이지로 이동하여 검색 및 페이지 매김을 추가하는 방법을 알아보겠습니다.

### Why use URL search params?

위에서 언급했듯이 URL 검색 매개변수를 사용하여 검색 상태를 관리하게 됩니다. 클라이언트 측 상태를 사용하는 데 익숙하다면 이 패턴이 생소할 수 있습니다.

URL 매개변수로 검색을 구현하면 몇 가지 이점이 있습니다:
- **북마크 및 공유 가능한 URL**: 검색 매개변수가 URL에 있으므로 사용자는 검색 쿼리 및 필터를 포함한 애플리케이션의 현재 상태를 북마크에 추가하여 나중에 참조하거나 공유할 수 있습니다.
- **서버 측 렌더링**: URL 매개변수를 서버에서 직접 사용하여 초기 상태를 렌더링할 수 있으므로 서버 렌더링을 더 쉽게 처리할 수 있습니다.
- **분석 및 추적**: URL에 검색 쿼리와 필터를 직접 넣으면 추가적인 클라이언트 측 로직 없이도 사용자 행동을 쉽게 추적할 수 있습니다.

### Adding the search functionality

다음은 검색 기능을 구현하는 데 사용할 Next.js 클라이언트 후크입니다:
- `useSearchParams` - 현재 URL의 매개변수에 액세스할 수 있습니다. 예를 들어, 이 URL `/dashboard/invoices?page=1&query=pending`에 대한 검색 매개변수는 다음과 같습니다: `{page: '1', query: 'pending'}`.
- `usePathname` - 현재 URL의 경로명을 읽을 수 있습니다. 예를 들어 `/dashboard/invoices` 경로의 경우, `usePathname`은 `'/dashboard/invoices'`를 반환합니다.
- `useRouter` - 클라이언트 컴포넌트 내에서 프로그래밍 방식으로 경로를 탐색할 수 있습니다. 여러 가지 방법을 사용할 수 있습니다.

Here's a quick overview of the implementation steps:
1. Capture the user's input.
2. Update the URL with the search params.
3. Keep the URL in sync with the input field.
4. Update the table to reflect the search query.

---

## [Mutating Data](https://nextjs.org/learn/dashboard-app/mutating-data)

이전 장에서는 URLSearchParams 와 Next.js API를 사용하여 검색 및 페이지 매김을 구현했습니다. 이제 송장 생성, 업데이트 및 삭제 기능을 추가하여 `/dashboard/invoices` 페이지에서 계속 작업해 보겠습니다.

### What are Server Actions?

React 서버 액션을 사용하면 서버에서 직접 비동기 코드를 실행할 수 있습니다. 데이터를 변경하기 위해 API 엔드포인트를 만들 필요가 없습니다. 대신 서버에서 실행되고 클라이언트 또는 서버 컴포넌트에서 호출할 수 있는 비동기 함수를 작성하면 됩니다.

웹 애플리케이션은 다양한 위협에 취약할 수 있으므로 보안이 최우선 과제입니다. 이때 서버 액션이 필요합니다. 여기에는 암호화된 종료, 엄격한 입력 검사, 오류 메시지 해싱, 호스트 제한 등의 기능이 포함되어 있으며, 이 모든 기능이 함께 작동하여 애플리케이션 보안을 크게 강화합니다.

### Using forms with Server Actions

React에서는 `<form>` 엘리먼트의 `action` 속성을 사용하여 액션을 호출할 수 있습니다. 액션은 캡처된 데이터가 포함된 네이티브 FormData 객체를 자동으로 수신합니다.

서버 컴포넌트 내에서 서버 액션을 호출할 때의 장점은 점진적인 성능 향상으로, 클라이언트에 자바스크립트가 아직 로드되지 않은 경우에도 양식이 작동합니다. 예를 들어 인터넷 연결 속도가 느려지지 않아도 됩니다.

### Next.js with Server Actions

서버 액션은 Next.js 캐싱과도 긴밀하게 통합되어 있습니다. 서버 액션을 통해 양식이 제출되면 해당 액션을 사용하여 데이터를 변경할 수 있을 뿐만 아니라 `revalidatePath` 및 `revalidateTag`와 같은 API를 사용하여 관련 캐시의 유효성을 다시 검사할 수도 있습니다.

### Further reading

이 장에서는 서버 액션을 사용하여 데이터를 변경하는 방법을 배웠습니다. 또한 `revalidatePath` API를 사용하여 Next.js 캐시를 재검증하고 `redirect`로 사용자를 새 페이지로 리디렉션하는 방법도 배웠습니다.

_**추가 학습을 위해 '[서버 작업을 통한 보안](https://nextjs.org/blog/security-nextjs-server-components-actions)'에 대해 자세히 알아볼 수도 있습니다.**_

---

## Handling Error

이전 장에서는 서버 액션을 사용하여 데이터를 변경하는 방법을 배웠습니다. 이번 장에서는 잡히지 않은 예외에 대해 JavaScript의 try/catch 문과 Next.js API를 사용하여 오류를 _우아하게_ 처리하는 방법을 살펴보겠습니다.

`error.tsx` 파일은 경로 세그먼트의 UI 경계를 정의하는 데 사용할 수 있습니다. 이 파일은 예기치 않은 오류에 대한 **포괄적인 역할**을 하며 사용자에게 대체 UI를 표시할 수 있습니다.

오류를 우아하게 처리할 수 있는 또 다른 방법은 `notFound` 함수를 사용하는 것입니다. `error.tsx`는 잡히지 않은 예외를 잡는 데 유용하지만, `notFound`는 존재하지 않는 리소스를 가져오려고 할 때 사용할 수 있습니다.

```directory
app/
  dashboard/
  - error.tsx << /dashboard/invoices/ 하위 페이지에서 에러 발생시 페이지 호출
    invoices/
      [id]/
        edit/
        - not-found.tsx  << /dashboard/invoices/{id}/edit 에서 notFound() 가 호출될 경우 페이지 호출
```

### Further reading

Next.js의 오류 처리에 대해 자세히 알아보려면 다음 문서를 확인하세요:

- [Error Handling](https://nextjs.org/learn/dashboard-app/error-handling#:~:text=the%20following%20documentation%3A-,Error%20Handling,-error.js%20API)
- [`error.js` API Reference](https://nextjs.org/learn/dashboard-app/error-handling#:~:text=error.js%20API%20Reference)
- [`notFound()` API Reference](https://nextjs.org/learn/dashboard-app/error-handling#:~:text=notFound()%20API%20Reference)
- [`not-found.js` API Reference](https://nextjs.org/learn/dashboard-app/error-handling#:~:text=not%2Dfound.js%20API%20Reference)

---

## Improving Accessibility

이전 장에서는 오류(404 오류 포함)를 포착하고 사용자에게 대체 방법을 표시하는 방법을 살펴봤습니다. 하지만 아직 퍼즐의 또 다른 조각인 양식 유효성 검사에 대해 논의해야 합니다. 서버 액션으로 서버 측 유효성 검사를 구현하는 방법과 접근성을 염두에 두고 React의 [`useActionState`](https://react.dev/reference/react/useActionState) 훅을 사용하여 양식 오류를 표시하는 방법을 살펴보겠습니다!

### What is accessibility?

접근성이란 장애인을 포함한 모든 사람이 사용할 수 있는 웹 애플리케이션을 설계하고 구현하는 것을 말합니다. 키보드 탐색, 시맨틱 HTML, 이미지, 색상, 동영상 등 다양한 영역을 포괄하는 방대한 주제입니다.

이 강좌에서는 접근성에 대해 자세히 다루지는 않겠지만, Next.js에서 사용할 수 있는 접근성 기능과 애플리케이션의 접근성을 높이기 위한 몇 가지 일반적인 관행에 대해 설명합니다.

접근성에 대해 자세히 알아보려면 [web.dev](https://nextjs.org/learn/dashboard-app/improving-accessibility#:~:text=Accessibility%20course%20by-,web.dev,-.)의 [접근성 배우기 과정](https://nextjs.org/learn/dashboard-app/improving-accessibility#:~:text=we%20recommend%20the-,Learn%20Accessibility,-course%20by%20web)을 추천합니다.

### Using the ESLint accessibility plugin in Next.js

Next.js는 접근성 문제를 조기에 발견할 수 있도록 ESLint 구성에 `eslint-plugin-jsx-a11y` 플러그인을 포함합니다. 예를 들어, 이 플러그인은 `alt`가 없는 이미지가 있거나 `aria-*` 및 `role` 속성을 잘못 사용하는 등의 경우 경고를 표시합니다.

선택 사항으로, 이 기능을 사용해 보고 싶다면 `package.json` 파일에 `next lint`를 스크립트로 추가하세요:

```json
// package.json
{
  ...
  "scripts": {
    "build": "next build",
    "dev": "next dev --turbopack",
    "start": "next start",
    "lint": "next lint" << run `pnpm lint` in your terminal
  },
  ...
}
```

이제 `pnpm lint`를 실행하면 다음과 같은 출력이 표시됩니다:

```terminal
✔ No ESLint warnings or errors
```

### Improving form accessibility

양식의 접근성을 개선하기 위해 이미 세 가지 작업을 진행하고 있습니다:

- **Semantic HTML**: `<div>` 대신 시맨틱 요소(`<input>`, `<option>` 등)를 사용합니다. 이렇게 하면 보조 기술(AT)이 입력 요소에 집중하여 사용자에게 적절한 문맥 정보를 제공하므로 양식을 더 쉽게 탐색하고 이해할 수 있습니다.
- **Labelling**: `<label>`과 `htmlFor` 속성을 포함하면 각 양식 필드에 설명 텍스트 레이블이 표시됩니다. 이렇게 하면 컨텍스트를 제공하여 AT 지원이 향상되고 사용자가 레이블을 클릭하여 해당 입력 필드에 집중할 수 있어 사용성이 향상됩니다.
- **Focus Outline**: 필드가 초점이 맞춰지면 윤곽선이 표시되도록 적절한 스타일이 지정됩니다. 이는 페이지의 활성 요소를 시각적으로 표시하여 키보드 및 화면 리더 사용자가 양식의 현재 위치를 이해하는 데 도움이 되므로 접근성을 위해 매우 중요합니다. `tab`을 눌러 확인할 수 있습니다.

이러한 관행은 많은 사용자가 양식에 더 쉽게 액세스할 수 있도록 하는 좋은 토대를 마련합니다. 하지만 양식 **유효성 검사** 및 **오류**를 해결하지는 못합니다.

### [Form validation](https://nextjs.org/learn/dashboard-app/improving-accessibility#form-validation)

http://localhost:3000/dashboard/invoices/create 으로 이동하여 빈 양식을 제출합니다. 어떻게 되나요?

오류가 발생했습니다! 이는 빈 양식 값을 서버 액션으로 전송하기 때문입니다. 클라이언트 또는 서버에서 양식의 유효성을 검사하여 이를 방지할 수 있습니다.

#### Client-Side validation

클라이언트에서 양식의 유효성을 검사하는 방법에는 몇 가지가 있습니다. 가장 간단한 방법은 양식의 `<input>` 및 `<select>` 요소에 `required` 속성을 추가하여 브라우저에서 제공하는 양식 유효성 검사에 의존하는 것입니다. 예를 들어:

```html
<input
  id="amount"
  name="amount"
  type="number"
  placeholder="Enter USD amount"
  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
  required
/>
```

양식을 다시 제출합니다. 빈 값으로 양식을 제출하려고 하면 브라우저에 경고가 표시됩니다.

일부 AT는 브라우저 유효성 검사를 지원하므로 이 접근 방식은 일반적으로 괜찮습니다.

클라이언트 측 유효성 검사의 대안은 서버 측 유효성 검사입니다. 다음 섹션에서 이를 구현하는 방법을 살펴보겠습니다.

#### *[Server-Side validation](https://nextjs.org/learn/dashboard-app/improving-accessibility#server-side-validation)

서버에서 양식의 유효성을 검사하면 다음과 같이 할 수 있습니다:
- 데이터를 데이터베이스로 보내기 전에 데이터가 예상되는 형식인지 확인하세요.
- 클라이언트 측 유효성 검사를 우회하는 악의적인 사용자의 위험을 줄이세요.
- 유효한 데이터로 간주되는 데이터에 대해 하나의 신뢰할 수 있는 출처를 확보하세요.

---

## [Adding Authentication](https://nextjs.org/learn/dashboard-app/adding-authentication)

이전 장에서는 양식 유효성 검사를 추가하고 접근성을 개선하여 인보이스 경로 구축을 마쳤습니다. 이 장에서는 대시보드에 인증을 추가합니다.