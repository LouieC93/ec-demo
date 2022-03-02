const config = {
  domain: 'https://mydomain.com',
};

export const API_URL: { [header: string]: string } = {
  order: `${config.domain}/order`,
};

export const API_URL_Mock: { [header: string]: string } = {
  order: '../../mock_data/order.json',
};
