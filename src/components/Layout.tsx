import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen pb-16">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
}
