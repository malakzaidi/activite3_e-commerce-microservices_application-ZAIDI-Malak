import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bill {
  id: number;
  customerId: number;
  billDate: string;
  totalAmount: number;
  productItems: any[];
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = 'http://localhost:8083/api/bills';

  constructor(private http: HttpClient) {}

  getBills(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  createBill(bill: Partial<Bill>): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill);
  }

  updateBill(id: number, bill: Partial<Bill>): Observable<Bill> {
    return this.http.put<Bill>(`${this.apiUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
