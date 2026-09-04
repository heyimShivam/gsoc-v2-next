import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        if (currentPage > 4) {
            pages.push("...");
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft size={18} />
            </button>

            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`}>
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={
                            currentPage === page
                                ? "active"
                                : ""
                        }
                        onClick={() => onPageChange(Number(page))}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}