## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

---

## Memo
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

