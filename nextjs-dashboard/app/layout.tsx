import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

// Next.js will automatically add the title and metadata to your application.
export const metadata: Metadata = {
    title: {
        template: '%s | Acme Dashboard',
        default: 'Acme Dashboard',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        {/* <body>에 폰트 적용하면 애플리케이션 전체에 적용됨*/}
        <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
