import { PaymentService } from './payment.service';
import { delay, map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { OderMsg } from './interface/payment.interface';
import { ApiException } from '@core/api-exception';

@Injectable({
  providedIn: 'root',
})
export class PaymentManagementService {
  private _orderMsg!: OderMsg;

  constructor(private paymentService: PaymentService) {}

  getOrderRes$(reqData: any): Observable<OderMsg> {
    return this.paymentService.sendOrderAPI(reqData).pipe(
      map((res) => {
        if(res.returnCode === 0) {
          return {
            en: res.message.en,
            cn: res.message.zh_CN,
          };
        } else {
          throw new ApiException(res.returnCode, res.message.en)
        }
      }),
      tap((res) => {
        this._orderMsg = res;
      }),
      delay(1000)
    );
  }
  getLangCode(): OderMsg {
    return this._orderMsg;
  }
}
