import { cn } from "@/lib/utils";
import { LucideIcon, Settings } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button, buttonVariants } from "@/Components/ui/button";
import ApplicationLogo from "@/Components/application-logo";
import { User } from "@/types";

interface SubMenu {
    name: string;
    href: string;
    icon: LucideIcon;
    permission?: string;
}

export interface Menu {
    label: string;
    subMenu: SubMenu[];
}

function evaluatePermission(user: User, permission?: string) {
    if (!permission) return true;
    if (!user.role) return false;

    const permissionManage = Math.round(Number(permission) / 100) * 100;
    const allowedPermissions = ["0", permissionManage.toString(), permission];

    const permissions = user.role?.permissions.map((item) => item.value);

    return allowedPermissions.some((item) => permissions.includes(item));
}

export function Sidebar({
    user,
    menu,
    className,
}: {
    user: User;
    menu: Menu[];
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col gap-4 p-4 h-screen", className)}>
            <ApplicationLogo className="w-10 h-10" />

            <ul className="flex-grow space-y-2 list-none">
                {menu.map((item, index) => (
                    <li key={index}>
                        <h5 className="mb-2 text-lg font-semibold tracking-tight">
                            {item.label}
                        </h5>
                        <ul className="space-y-2 list-none">
                            {item.subMenu.map(
                                (item, index) =>
                                    evaluatePermission(
                                        user,
                                        item.permission
                                    ) && (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    buttonVariants({
                                                        variant:
                                                            route()
                                                                .current()
                                                                ?.search(
                                                                    item.name.toLowerCase()
                                                                ) !== -1
                                                                ? "default"
                                                                : "ghost",
                                                    }),
                                                    "text-sm flex justify-start w-full"
                                                )}
                                            >
                                                <item.icon
                                                    className="w-4 h-4 mr-2"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                            )}
                        </ul>
                    </li>
                ))}
            </ul>

            <div className="sticky inset-x-0 bottom-0 pt-4 border-t">
                <Button variant="ghost" className="justify-start w-full">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
            </div>
        </div>
    );
}
