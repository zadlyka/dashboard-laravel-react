import { Head } from "@inertiajs/react";
import { Role, PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";

export default function Show({ auth, role }: PageProps<{ role: Role }>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Role" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Role
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                    </div>
                    {JSON.stringify(role)}
                </div>
            </div>
        </DashboardLayout>
    );
}
