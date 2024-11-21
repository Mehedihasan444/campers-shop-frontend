
import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  
  type PaginationComponentProps = {
    totalCount: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
  }
  const PaginationComponent = ({ totalCount, page, limit, onPageChange }:PaginationComponentProps) => {
    const totalPages = Math.ceil(totalCount / limit);
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(Math.max(1, page - 1))}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === page}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

export default PaginationComponent;