import { PropsWithChildren } from "react";
import { User } from "@/types";
import { Sidebar } from "@/Components/dashboard/sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Header } from "@/Components/dashboard/header";
import { Grid2X2, LayoutDashboard, ShieldEllipsis } from "lucide-react";

export default function DashboardLayout({
    user,
    search,
    children,
}: PropsWithChildren<{ user: User; search?: string }>) {
    const menu = [
        {
            label: "Pages",
            subMenu: [
                {
                    name: "Dashboard",
                    href: route("dashboard"),
                    icon: LayoutDashboard,
                    active: route().current("dashboard"),
                    permission: undefined,
                },
                {
                    name: "Role",
                    href: route("role"),
                    icon: ShieldEllipsis,
                    active: route().current("role"),
                    permission: "100",
                },
                {
                    name: "Basic",
                    href: route("basic"),
                    icon: Grid2X2,
                    active: route().current("basic"),
                    permission: "300",
                },
            ],
        },
    ];

    return (
        <main className="flex h-screen">
            <Sidebar
                menu={menu}
                className="hidden w-1/4 sm:flex border-e"
                user={user}
            />
            <ScrollArea className="w-full h-screen">
                <Header
                    user={user}
                    menu={menu}
                    search={search}
                    className="sticky top-0"
                />
                <div>{children}</div>
            </ScrollArea>
        </main>
    );
}
