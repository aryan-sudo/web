"use client"

import * as React from "react"
import {
  Code,
  // FileCode,
  Layers,
  PieChart,
  Settings2,
  Kanban,
  Users,
  FileText,
  Calendar,
  GanttChart,
  Briefcase,
  // CheckSquare,
  GitBranch,
  UserPlus,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"

import { NavMain } from "@/components/layout/nav/nav-main"
// import { NavProjects } from "@/components/layout/nav/nav-projects"
import { NavUser } from "@/components/layout/nav/nav-user"
import { TeamSwitcher } from "@/app/(protected)/_components/team-switcher"
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
    { name: "FlowPilot", logo: Layers, plan: "Enterprise" },
    { name: "DevTeam", logo: GitBranch, plan: "Team" },
    { name: "Personal", logo: Briefcase, plan: "Starter" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Analytics", url: "/dashboard/analytics" },
        { title: "Reports", url: "/dashboard/reports" },
      ],
    },
    {
      title: "Lead Processing",
      url: "/lead-processing",
      icon: UserPlus,
    },
    {
      title: "Proposals & Contracts",
      url: "/proposals",
      icon: FileText,
      items: [
        { title: "Proposals & Estimates", url: "/proposals/estimates" },
        { title: "Contract Generation", url: "/proposals/contracts" },
        { title: "Approval Workflow", url: "/proposals/approval" },
      ],
    },
    {
      title: "Project Kickoff",
      url: "/project-kickoff",
      icon: Calendar,
      items: [
        { title: "Project Setup", url: "/project-kickoff/setup" },
        { title: "Resource Allocation", url: "/project-kickoff/resources" },
        { title: "Sprint Planning", url: "/project-kickoff/sprint-planning" },
      ],
    },
    {
      title: "Project Management",
      url: "/project-management",
      icon: GanttChart,
      items: [
        { title: "Projects", url: "/project-management/projects" },
        { title: "Milestones", url: "/project-management/milestones" },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: Kanban,
      items: [
        { title: "Kanban Board", url: "/tasks/kanban" },
        { title: "Dependencies", url: "/tasks/dependencies" },
        { title: "My Tasks", url: "/tasks/my-tasks" },
        { title: "Tracking", url: "/tasks/tracking" },
      ],
    },
    {
      title: "Code Generation",
      url: "/code-generation",
      icon: Code,
      items: [
        { title: "Generate Code", url: "/code-generation/generate" },
        { title: "Code Review", url: "/code-generation/review" },
        { title: "Templates", url: "/code-generation/templates" },
      ],
    },
    {
      title: "Collaboration",
      url: "/collaboration",
      icon: Users,
      items: [
        { title: "Team", url: "/collaboration/team" },
        { title: "Communications", url: "/collaboration/communications" },
        { title: "Workspace", url: "/collaboration/workspace" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "User Profile", url: "/settings/profile" },
        { title: "Organization", url: "/settings/organization" },
        { title: "Integrations", url: "/settings/integrations" },
        { title: "Security", url: "/settings/security" },
      ],
    },
  ],
  // projects: [
  //   { name: "Web Platform", url: "#", icon: FileCode },
  //   { name: "Mobile Application", url: "#", icon: Layers },
  //   { name: "API Development", url: "#", icon: CheckSquare },
  // ],
};


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
        <NavMain items={data.navMain} essentialItemTitle="Lead Processing" />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

