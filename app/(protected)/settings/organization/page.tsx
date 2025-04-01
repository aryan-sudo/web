import { Heading } from "@/components/ui/heading"

export default function OrganizationPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Organization</Heading>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">General Settings</h3>
          <p className="mt-2 text-muted-foreground">
            Configure organization name, logo, and basic settings.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">User Management</h3>
          <p className="mt-2 text-muted-foreground">
            Manage users and access within your organization.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Departments</h3>
          <p className="mt-2 text-muted-foreground">
            Configure departments and team structure.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Roles & Permissions</h3>
          <p className="mt-2 text-muted-foreground">
            Set up custom roles and permission levels.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Billing & Subscription</h3>
          <p className="mt-2 text-muted-foreground">
            Manage billing information and subscription details.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Audit Logs</h3>
          <p className="mt-2 text-muted-foreground">
            View history of organization-wide actions and changes.
          </p>
        </div>
      </div>
    </div>
  )
} 