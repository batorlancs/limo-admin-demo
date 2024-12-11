import * as React from "react";
import {
    AudioWaveform,
    BarChart3,
    Command,
    GalleryVerticalEnd,
    HelpCircle,
    MapPin,
    MapPinPlusInside,
    Receipt,
    Settings2,
    Truck,
    UserCircle,
    Users,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "admin user",
        email: "admin@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Limo Anywhere",
            logo: GalleryVerticalEnd,
            plan: "Admin",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [],
    projects: [
        {
            name: "Dispatch",
            url: "#",
            icon: MapPinPlusInside,
            selected: true,
        },
        {
            name: "Vehicles",
            url: "#",
            icon: Truck,
        },
        {
            name: "Drivers",
            url: "#",
            icon: Users,
        },
        {
            name: "Clients",
            url: "#",
            icon: UserCircle,
        },
        {
            name: "Routes",
            url: "#",
            icon: MapPin,
        },
        {
            name: "Analytics",
            url: "#",
            icon: BarChart3,
        },
        {
            name: "Invoicing",
            url: "#",
            icon: Receipt,
        },
    ],
    settings: [
        {
            name: "Settings",
            url: "#",
            icon: Settings2,
        },
        {
            name: "Help",
            url: "#",
            icon: HelpCircle,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain items={data.navMain} /> */}
                <NavProjects projects={data.projects} title="Navigation" />
                <NavProjects projects={data.settings} title="Settings" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
