export interface OrderResponse {
  returnCode: number;
  title: Message;
  message: Message;
  img: string;
}

export interface Message {
  en: string;
  zh_CN: string;
}
