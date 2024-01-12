import { buttonVariants } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginateLink {
    prev_page_url: string;
    next_page_url: string;
    path: string;
    current_page: number;
}

export default function Paginate({
    paginateLink,
    className,
}: {
    paginateLink: PaginateLink;
    className?: string;
}) {
    return (
        <div
            className={cn(
                className,
                "flex items-center justify-center gap-4 mt-4"
            )}
        >
            <Link
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "gap-1 pl-2.5"
                )}
                href={paginateLink.prev_page_url}
            >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
            </Link>
            <span className="text-sm font-semibold">
                {paginateLink.current_page}
            </span>
            <Link
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "gap-1 pr-2.5"
                )}
                href={paginateLink.next_page_url}
            >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
