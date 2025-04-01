import { Heading } from "@/components/ui/heading"

export default function SecurityPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Security</Heading>
        <p className="text-muted-foreground">
          Manage security settings and protect your account.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
          <p className="mt-2 text-muted-foreground">
            Add an extra layer of security to your account.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-red-500">Not enabled</span>
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Enable 2FA
            </button>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Login Sessions</h3>
          <p className="mt-2 text-muted-foreground">
            View and manage your active login sessions.
          </p>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">Current Session</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <button className="text-sm text-primary">View all sessions</button>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Password Requirements</h3>
          <p className="mt-2 text-muted-foreground">
            Set password policies for your organization.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>• Minimum 8 characters</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one number</li>
            <li>• At least one special character</li>
          </ul>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Login History</h3>
          <p className="mt-2 text-muted-foreground">
            View your recent login activity.
          </p>
          <div className="mt-4 text-sm">
            <div className="mb-2">
              <div>Today, 10:45 AM</div>
              <div className="text-muted-foreground">Chrome on Windows</div>
            </div>
            <div className="mb-2">
              <div>Yesterday, 8:30 PM</div>
              <div className="text-muted-foreground">Safari on MacOS</div>
            </div>
            <button className="text-primary">View full history</button>
          </div>
        </div>
      </div>
    </div>
  )
} 