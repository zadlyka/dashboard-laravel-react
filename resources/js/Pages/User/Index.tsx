import { Head, Link } from "@inertiajs/react";
import { User, PageProps, Role } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { buttonVariants } from "@/Components/ui/button";
import { MoreVertical } from "lucide-react";
import Paginate, { PaginateLink } from "@/Components/paginate";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { createQueryString } from "@/lib/utils";

interface UserPaginate extends PaginateLink {
    data: User[];
}

export default function Index({
    auth,
    paginate,
    filters,
}: PageProps<{ paginate: UserPaginate; filters: { roles: Role[] } }>) {
    const params = new URLSearchParams(window.location.search);
    const sort = params.get("sort") ?? "";
    const role = params.get("filter[role_id]") ?? "";

    return (
        <DashboardLayout user={auth.user}>
            <Head title="User" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                User
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </p>
                        </div>

                        <div className="inline-flex gap-2">
                            <Select
                                onValueChange={(value) => {
                                    location.replace(
                                        route().current() +
                                            "?" +
                                            createQueryString(
                                                "filter[role_id]",
                                                value
                                            )
                                    );
                                }}
                                defaultValue={role}
                            >
                                <SelectTrigger className="hidden w-[180px] sm:flex">
                                    <SelectValue placeholder="Filter Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filters.roles.map((item) => (
                                        <SelectItem
                                            value={item.id}
                                            key={item.id}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                onValueChange={(value) => {
                                    location.replace(
                                        route().current() +
                                            "?" +
                                            createQueryString("sort", value)
                                    );
                                }}
                                defaultValue={sort}
                            >
                                <SelectTrigger className="hidden w-[180px] sm:flex">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name:asc">
                                        Name - ASC
                                    </SelectItem>
                                    <SelectItem value="name:desc">
                                        Name - DESC
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Link
                                href={route("user.create")}
                                className={buttonVariants()}
                            >
                                Add
                            </Link>
                        </div>
                    </div>

                    <Table>
                        <TableCaption>
                            A list of your recent users.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Email
                                </TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginate.data?.map((item: User) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="hidden font-medium sm:table-cell">
                                        {item.email}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <MoreVertical className="w-4 h-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "user.show",
                                                            item.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            item.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={route(
                                                            "user.destroy",
                                                            item.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="w-full"
                                                    >
                                                        Delete
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Paginate className="mt-4" paginateLink={paginate} />
                </div>
            </div>
        </DashboardLayout>
    );
}
