"use client"

import * as React from "react"
import {
  Code,
  FileCode,
  Layers,
  PieChart,
  Settings2,
  Kanban,
  Users,
  Puzzle,
  GanttChart,
  Briefcase,
  CheckSquare,
  GitBranch,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data for the sidebar navigation
const data = {
  teams: [
    {
      name: "FlowPilot",
      logo: Layers,
      plan: "Enterprise",
    },
    {
      name: "DevTeam",
      logo: GitBranch,
      plan: "Team",
    },
    {
      name: "Personal",
      logo: Briefcase,
      plan: "Starter",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Project Management",
      url: "#",
      icon: GanttChart,
      items: [
        {
          title: "Projects",
          url: "#",
        },
        {
          title: "Planning",
          url: "#",
        },
        {
          title: "Resource Allocation",
          url: "#",
        },
      ],
    },
    {
      title: "Requirements",
      url: "#",
      icon: Puzzle,
      items: [
        {
          title: "Requirements List",
          url: "#",
        },
        {
          title: "Analysis",
          url: "#",
        },
        {
          title: "Tracking",
          url: "#",
        },
      ],
    },
    {
      title: "Tasks",
      url: "#",
      icon: Kanban,
      items: [
        {
          title: "Kanban Board",
          url: "#",
        },
        {
          title: "Dependencies",
          url: "#",
        },
        {
          title: "My Tasks",
          url: "#",
        },
      ],
    },
    {
      title: "Code Generation",
      url: "#",
      icon: Code,
      items: [
        {
          title: "Generate Code",
          url: "#",
        },
        {
          title: "Code Review",
          url: "#",
        },
        {
          title: "Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Collaboration",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Communications",
          url: "#",
        },
        {
          title: "Workspace",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "User Profile",
          url: "#",
        },
        {
          title: "Organization",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
        {
          title: "Security",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Web Platform",
      url: "#",
      icon: FileCode,
    },
    {
      name: "Mobile Application",
      url: "#",
      icon: Layers,
    },
    {
      name: "API Development",
      url: "#",
      icon: CheckSquare,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  
  // User fallback for when Clerk hasn't loaded yet
  const userData = user ? {
    name: user.fullName || user.username || "User",
    email: user.primaryEmailAddress?.emailAddress || "",
    avatar: user.imageUrl || null,
  } : {
    name: "Loading...",
    email: "",
    avatar: null,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

