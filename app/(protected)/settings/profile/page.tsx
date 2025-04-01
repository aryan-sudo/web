import { Heading } from "@/components/ui/heading"

export default function UserProfilePage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">User Profile</Heading>
        <p className="text-muted-foreground">
          Manage your personal account settings and preferences.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm md:col-span-2">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <p className="mt-2 text-muted-foreground">
            Update your name, email, and contact details.
          </p>
          <div className="mt-4 space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" placeholder="John Doe" className="rounded-md border px-3 py-2" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" placeholder="john@example.com" className="rounded-md border px-3 py-2" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Job Title</label>
              <input type="text" placeholder="Project Manager" className="rounded-md border px-3 py-2" />
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Profile Picture</h3>
          <p className="mt-2 text-muted-foreground">
            Update your profile photo.
          </p>
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-medium">JD</span>
            </div>
            <button className="rounded-md border px-4 py-2 text-sm">Change Photo</button>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Password</h3>
          <p className="mt-2 text-muted-foreground">
            Update your account password.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Notifications</h3>
          <p className="mt-2 text-muted-foreground">
            Configure email and in-app notification preferences.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Connected Accounts</h3>
          <p className="mt-2 text-muted-foreground">
            Manage accounts connected to your profile.
          </p>
        </div>
      </div>
    </div>
  )
} 