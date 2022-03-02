import { HttpService } from './../../core/http.service';
import { Injectable } from '@angular/core';
import { OrderResponse } from '@core/api-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpService) { }

  sendOrderAPI(reqData: any) {
    return this.http.post<OrderResponse>('order', reqData);
  }
}
