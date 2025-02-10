import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

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
