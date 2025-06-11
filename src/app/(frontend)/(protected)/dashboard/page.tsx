import SignoutButton from "../components/signout-button";
import SubscriptionButton from "../components/subscription-button";
import { DashboardOverview } from "../components/DashboardOverview";

export default async function Dashboard() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>
        <DashboardOverview />
      </div>
    );
  }
  