import type { ReactNode } from 'react';
import './styles/globals.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Providers } from '@/lib/redux/provider';
import { Sidebar } from '../components/sidebar';
import { BottomMenu } from '../components/mobile-menu';
import AddBusiness from '../components/add-business';
interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <main className="absolute right-0 left-0 top-0 flex overflow-y-hidden h-screen bg-base-200">
            <Sidebar />
            <AddBusiness />
            <BottomMenu />
            <div className="flex-1 overflow-y-auto flex-grow bg-white">
              {children}
            </div>
          </main>
        </body>
      </html>
    </Providers>
  );
}
