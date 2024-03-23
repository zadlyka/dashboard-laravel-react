import { PropsWithChildren } from "react";
import { User } from "@/types";
import { Sidebar } from "@/Components/dashboard/sidebar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Header } from "@/Components/dashboard/header";
import {
    ComponentIcon,
    LayoutDashboardIcon,
    ShieldEllipsisIcon,
    UserIcon,
} from "lucide-react";

export default function DashboardLayout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    const menu = [
        {
            label: "Pages",
            subMenu: [
                {
                    name: "Dashboard",
                    href: route("dashboard"),
                    icon: LayoutDashboardIcon,
                    permission: undefined,
                },
                {
                    name: "Role",
                    href: route("role"),
                    icon: ShieldEllipsisIcon,
                    permission: "100",
                },
                {
                    name: "User",
                    href: route("user"),
                    icon: UserIcon,
                    permission: "200",
                },
                {
                    name: "Category",
                    href: route("category"),
                    icon: ComponentIcon,
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
                <Header user={user} menu={menu} className="sticky top-0 z-50" />
                <div>{children}</div>
            </ScrollArea>
        </main>
    );
}
