import { Head } from "@inertiajs/react";
import { Category, PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";

export default function Show({
    auth,
    category,
}: PageProps<{ category: Category }>) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Category" />
            <div className="p-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="inline-flex justify-between w-full">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                Category
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                    </div>
                    {JSON.stringify(category)}
                </div>
            </div>
        </DashboardLayout>
    );
}
