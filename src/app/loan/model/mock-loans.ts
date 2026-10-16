import { PaginatedData } from "../../core/model/page/PaginatedData";
import { Pageable } from "../../core/model/page/Pageable";
import { Loan } from "./loan";
import { Game } from "../../game/model/game";

export const LOAN_DATA: PaginatedData<Loan> = {
    content: [
        { id: 1, game: { id: 1, title: 'Juego 1' } as Game, client: { id: 1, name: 'John Smith' }, startDate: new Date('2026-11-06'), endDate: new Date( '2026-11-10' )},
        { id: 2, game: { id: 2, title: 'Juego 2' } as Game, client: { id: 2, name: 'Emma Johnson' }, startDate: new Date ('2026-11-04'), endDate: new Date ('2026-11-09' )},
        { id: 3, game: { id: 3, title: 'Juego 3' } as Game, client: { id: 3, name: 'Michael Brown' }, startDate: new Date ( '2026-11-03'), endDate: new Date ('2026-11-05') },
        { id: 4, game: { id: 3, title: 'Juego 4' } as Game, client: { id: 4, name: 'Sophia Davis' }, startDate: new Date('2026-11-08'), endDate: new Date ('2026-11-12' )}
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 4,
};