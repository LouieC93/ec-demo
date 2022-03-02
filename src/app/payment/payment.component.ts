import { PaymentManagementService } from './_domain/payment.management.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OderMsg, PaymentText } from './_domain/interface/payment.interface';
import { Payment_CN, Payment_EN } from 'src/assets/lang/payment';
import { CONSOLE } from '@core/encap-console';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, concatMap, from, Observable, of } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  Text!: PaymentText;
  NowStep: number = 1;

  langForm!: FormGroup;
  langCodeOptions = ['EN', 'CN'];

  userInfoForm!: FormGroup;

  orderMsg!: OderMsg;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private paymentManager: PaymentManagementService, private router: Router) {}

  ngOnInit(): void {
    this.initNowStep();
    this.initText();
    this.initLangForm();
    this.intiUserInfoForm();
  }

  // DIVIDE: INIT Functions
  initNowStep() {
    const step = this.route.snapshot.paramMap.get('step')!;
    this.NowStep = Number(step);
  }

  initText() {
    const lang = this.route.snapshot.paramMap.get('lang')!;
    this.Text = this.getDiffLangText(lang);
    CONSOLE.log(this.Text);
  }

  initLangForm() {
    const lang = this.route.snapshot.paramMap.get('lang')!;
    this.langForm = this.fb.group({
      langCode: new FormControl(lang.toUpperCase()),
    });
  }

  intiUserInfoForm() {
    this.userInfoForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  // DIVIDE: Page Navigation Functions
  goNextStep() {
    this.getNavigateUrl(true).subscribe(() => {
      this.initNowStep();
    });
  }

  goPrevPage() {
    this.getNavigateUrl(false).subscribe(() => {
      this.initNowStep();
    });
  }

  /**
   * assume submit data & send request in step 2 -> 3
   */
  submit() {
    this.paymentManager
      .getOrderRes$('some reqData')
      .pipe(
        catchError(error => {
          CONSOLE.log('[PaymentComponent: submit] error',error);
          return of({
            en: 'transaction failed',
            cn: '交易失敗'
          })
        }),
        concatMap((res) => {
          this.orderMsg = res;
          CONSOLE.log(this.orderMsg);
          return this.getNavigateUrl(true);
        }),
      )
      .subscribe(() => {
        this.initNowStep();
      });
  }

  /**
   * Get a router navigation observable.
   * @param isGoNext when go to next step => true
   * @returns A Observable<boolean> can be subscribe & do init when navigation ends
   */
  getNavigateUrl(isGoNext: boolean): Observable<boolean> {
    const pageLang = this.langForm.get('langCode')?.value;
    if (isGoNext) {
      switch (this.NowStep) {
        case 1:
          return from(this.router.navigateByUrl(`/${pageLang.toLowerCase()}/payment/2`));
        case 2:
          return from(this.router.navigateByUrl(`/${pageLang.toLowerCase()}/payment/3`));
        default:
          this.intiUserInfoForm();
          return from(this.router.navigateByUrl(`/${pageLang.toLowerCase()}/payment/1`));
      }
    } else {
      switch (this.NowStep) {
        case 2:
          return from(this.router.navigateByUrl(`/${pageLang.toLowerCase()}/payment/1`));
        case 3:
          return from(this.router.navigateByUrl(`/${pageLang.toLowerCase()}/payment/2`));
        default:
          return from(this.router.navigateByUrl(`/${pageLang.toLowerCase()}/payment/1`));
      }
    }
  }

  // DIVIDE: Used Functions
  goAnotherLangPage(langCode: string) {
    from(this.router.navigateByUrl(`/${langCode.toLowerCase()}/payment/${this.NowStep}`)).subscribe(() => {
      this.initText();
    });
  }

  /**
   * Get different language's text.
   * @param langCode diff countries language code
   * @returns different language's text
   */
  getDiffLangText(langCode: string): PaymentText {
    switch (langCode.toLowerCase()) {
      case 'en':
        return Payment_EN;
      case 'cn':
        return Payment_CN;
      default:
        return Payment_EN;
    }
  }

  get getLangFormValue() {
    return this.langForm.get('langCode')?.value;
  }
}
