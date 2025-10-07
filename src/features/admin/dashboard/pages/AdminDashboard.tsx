import { DashboardHeader } from '../components/DashboardHeader';
import { StatsGrid } from '../components/StatsGrid';
import { QuickActions } from '../components/QuickActions';
import { WelcomeCard } from '../components/WelcomeCard';
import { GettingStartedGuide } from '../components/GettingStartedGuide';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions />
        <WelcomeCard />
      </div>
      <GettingStartedGuide />
    </div>
  );
}