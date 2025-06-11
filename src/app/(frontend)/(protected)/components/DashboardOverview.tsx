import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, FileText, Plus, TrendingUp, Sparkles } from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      description: "Active across all tenants",
      icon: Package,
      trend: "+2 from last month",
    },
    {
      title: "Templates Used",
      value: "8",
      description: "Reusable across tenants",
      icon: FileText,
      trend: "+1 from last week",
    },
    {
      title: "This Month",
      value: "5",
      description: "New deployments",
      icon: TrendingUp,
      trend: "+3 from last month",
    },
  ];

  const recentProjects = [
    { name: "E-commerce Store", template: "Next.js + Payload", status: "Active", created: "2 days ago" },
    { name: "Blog Platform", template: "Next.js + Payload", status: "Active", created: "5 days ago" },
    { name: "Portfolio Site", template: "Next.js + Payload", status: "Draft", created: "1 week ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome / About ShipShup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Welcome to ShipShip
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            ShipShip is a project and template builder powered by Next.js, Payload CMS, and modern UI tools -> all completely free for use.
            It helps you ship ideas faster with reusable templates, project scaffolding, and customization.
          </p>
          <p>
            This dashboard gives you an overview of your activity. If there’s anything you wish ShipShup had — features, styling improvements, or integrations — don’t hesitate to let me know!
            Currently, this dashboard (protected routes) is not editable via the CMS.
          </p>
          <p>
            <strong className="text-foreground">Coming soon:</strong> per-tenant user auth and permissions, better visual theming and layout options, and AI-assisted page/content generation.
          </p>
          <p>
            <strong className="text-foreground">To support:</strong> contribute to the project :), give ideas/tips on where to focus, share the project, and use our affiliate links. Thanks alot!
          </p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <Plus className="h-6 w-6" />
              Create New Project
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6" />
              Browse Templates
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Package className="h-6 w-6" />
              Manage Projects
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.template}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </div>
                  <p className="text-xs text-muted-foreground">{project.created}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
