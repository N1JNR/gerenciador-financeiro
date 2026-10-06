import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transactions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {

  private httpclient = inject(HttpClient);
  
 getAll() {
   return this.httpclient
      .get<Transaction[]>('http://localhost:3000/transactions')
  }


  post(payload: TransactionPayload) {
    return this.httpclient.post<Transaction>(
        'http://localhost:3000/transactions', 
        payload
    )
  }


}
