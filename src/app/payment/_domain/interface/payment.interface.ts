export interface PaymentText {
  nav: {
    help: string;
    signIn: string;
  };
  step: { fillData: string; pay: string; finish: string };
  button: {
    continue: string;
    back: string;
    pay: string;
    home: string;
  };
}

export interface OderMsg {
  en: string;
  cn: string;
}
