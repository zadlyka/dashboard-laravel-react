import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import DashboardLayout from "@/Layouts/dashboard-layout";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/Components/ui/drawer";
import { Button, buttonVariants } from "@/Components/ui/button";
import InputError from "@/Components/input-error";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";

function AddForm({ className }: { className?: string }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("category.store"));
    };

    return (
        <form onSubmit={submit} className={cn(className, "space-y-6")}>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="block w-full mt-1"
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <Button className="w-full" disabled={processing}>
                Save
            </Button>
        </form>
    );
}

function DrawerDialogDemo() {
    const [isOpen, setIsOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    const isWindow = typeof window !== "undefined";
    const getWidth = () => (isWindow ? window.innerWidth : 0);

    useEffect(() => {
        if (!isOpen) {
            history.back();
        }

        if (isWindow) {
            const width = getWidth();
            if (width >= 768) setIsDesktop(true);
        }
    }, [isOpen, isDesktop, setIsDesktop]);

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add category</DialogTitle>
                        <DialogDescription>
                            Please fill out this form.
                        </DialogDescription>
                    </DialogHeader>
                    <AddForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add category</DrawerTitle>
                    <DrawerDescription>
                        Please fill out this form.
                    </DrawerDescription>
                </DrawerHeader>
                <AddForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default function Create({ auth }: PageProps) {
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
                        <Link
                            href={route("category.create")}
                            className={buttonVariants()}
                        >
                            Add
                        </Link>
                    </div>

                    <DrawerDialogDemo />
                </div>
            </div>
        </DashboardLayout>
    );
}
