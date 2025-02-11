import DashboardSkeleton from '@/app/ui/skeletons';

/**
 * 여기서 몇 가지 일이 일어나고 있습니다:
 * 1. `loading.tsx`는 리액트 서스펜스 위에 구축된 특별한 Next.js 파일입니다. 이를 통해 페이지 콘텐츠가 로드되는 동안 대체로 표시할 폴백 UI를 만들 수 있습니다.
 * 2. <SideNav>은 정적이므로 즉시 표시됩니다. 사용자는 동적 콘텐츠가 로드되는 동안 <SideNav>와 상호 작용할 수 있습니다.
 * 3. 사용자는 페이지 로딩이 완료될 때까지 기다렸다가 이동하지 않아도 됩니다(이를 중단 없는 탐색이라고 합니다).
 * @constructor
 */
export default function Loading() {
    /**
     * 지금 바로 로딩 골격이 인보이스에 적용됩니다.
     *
     * loading.tsx가 `app/dashboard/` 에 있으면...
     * - loading.tsx는 파일 시스템에서 /invoices/page.tsx 및 /customers/page.tsx보다 상위 레벨에 있으므로 해당 페이지에도 적용됩니다.
     *
     * loading.tsx가 `app/dashboard/(overview)/` 에 있으면...
     * - 경로 그룹을 사용하면 URL 경로 구조에 영향을 주지 않고 파일을 논리적인 그룹으로 구성할 수 있습니다. 괄호()를 사용하여 새 폴더를 만들면 URL 경로에 이름이 포함되지 않습니다. 따라서 /dashboard/(개요)/page.tsx는 /dashboard가 됩니다.
     * - 여기서는 경로 그룹을 사용하여 loading.tsx가 대시보드 개요 페이지에만 적용되도록 하고 있습니다. 그러나 경로 그룹을 사용하여 애플리케이션을 섹션(예: (marketing) 경로 및 (shop) 경로)으로 분리하거나 더 큰 애플리케이션의 경우 팀별로 분리할 수도 있습니다.
     *
     * Route Groups 를 사용하여 이를 변경할 수 있습니다. 대시보드 폴더 안에 /(overview)라는 새 폴더를 만듭니다. 그런 다음 폴더 안에 `loading.tsx` 및 `page.tsx` 파일을 이동합니다:
     */
    return <DashboardSkeleton />;
}