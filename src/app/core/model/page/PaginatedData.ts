import { Pageable } from "../../model/page/Pageable";

export interface PaginatedData <TData>{
    content: TData[];
    pageable: Pageable;
    totalElements: number;
}
