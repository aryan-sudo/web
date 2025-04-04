"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
export function NavMain({
  items,
  essentialItemTitle,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      description?: string
      component?: React.ComponentType
      isActive?: boolean
    }[]
  }[]
  essentialItemTitle?: string
}) {
  // Find and separate the essential item
  const essentialItem = essentialItemTitle ? items.find(item => item.title === essentialItemTitle) : undefined;
  const regularItems = essentialItemTitle ? items.filter(item => item.title !== essentialItemTitle) : items;
  
  return (
    <>
      {essentialItem && (
        <SidebarGroup>
          <SidebarGroupLabel>Essential Workflow</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                tooltip={essentialItem.title} 
                isActive={essentialItem.isActive}
              >
                <Link 
                  href={essentialItem.url} 
                  data-active={essentialItem.isActive}
                >
                  {essentialItem.icon && <essentialItem.icon/>}
                  <span>{essentialItem.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}
      
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {regularItems.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={item.isActive}
                    data-active={item.isActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        {subItem.component ? (
                          <div className="flex items-center justify-between px-2 py-1">
                            <span className="text-sm text-muted-foreground">{subItem.title}</span>
                            <subItem.component />
                          </div>
                        ) : (
                          <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                            <Link 
                              href={subItem.url}
                              data-active={subItem.isActive}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
