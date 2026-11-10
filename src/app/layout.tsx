import type { Metadata } from 'next';
import { StoreProvider } from '@/components/store';
import { Shell } from '@/components/shell';
import './globals.css';
export const metadata:Metadata={title:'Gráfica 011 | Sua ideia, nossa impressão.',description:'Explore produtos personalizados, gravação a laser e soluções gráficas. Configure seu projeto e solicite um orçamento.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body><StoreProvider><Shell>{children}</Shell></StoreProvider></body></html>; }
