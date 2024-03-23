"use client";
import { cn, createQueryString } from "@/lib/utils";
import { Bell, ChevronDown, Menu as MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Menu, Sidebar } from "@/Components/dashboard/sidebar";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { User } from "@/types";

export function Header({
    user,
    menu,
    className,
}: {
    user: User;
    menu: Menu[];
    className?: string;
}) {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search") ?? "";

    const [message, setMessage] = useState("");

    return (
        <div
            className={cn(
                "flex items-center justify-between sm:justify-end gap-4 p-4 border-b z-10 bg-white",
                className
            )}
        >
            <Sheet>
                <SheetTrigger className="sm:hidden">
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left">
                    <Sidebar menu={menu} className="py-8" user={user} />
                </SheetContent>
            </Sheet>

            <Input
                id="search"
                type="search"
                placeholder="search..."
                defaultValue={search}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        location.replace(
                            route().current() +
                                "?" +
                                createQueryString(
                                    "search",
                                    (e.target as HTMLButtonElement).value
                                )
                        );
                    }
                }}
                className="w-full sm:w-1/3"
            />

            <div className="flex gap-2 sm:gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="relative" size="icon">
                            <Bell className="w-4 h-4 " />
                            <span className="sr-only">Notifications</span>
                            {message && (
                                <div className="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full -top-2 -end-2" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            {message ? message : "Not found"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="inline-flex items-center gap-4 cursor-pointer">
                            <Avatar>
                                <AvatarImage
                                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm sm:flex">
                                {user.name}
                            </span>
                            <ChevronDown className="hidden w-4 h-4 sm:flex" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={route("profile.edit")}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full"
                            >
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
