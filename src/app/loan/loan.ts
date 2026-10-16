import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/loan';
import { PaginatedData } from '../core/model/page/PaginatedData';
import { LOAN_DATA } from './model/mock-loans';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LoanService {

    protected readonly http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/loan';
    contructor() { }
    getLoans(pageable: Pageable, idGame?: number | null, idClient?: number | null, date?: string): Observable<PaginatedData<Loan>> {
        return this.http.post<PaginatedData<Loan>>(this.baseUrl, { pageable, idGame, idClient, date });
    }

    saveLoan(loan: Loan): Observable<Loan> {
        const { id } = loan;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Loan>(url, loan);
    }

    deleteLoan(idLoan: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
    }
}
