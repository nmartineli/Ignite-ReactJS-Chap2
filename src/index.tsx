import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  //Criar dados já cadastrados na API
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salário',
          type: 'deposit',
          category: 'Trabalho',
          amount: 6000,
          createdAt: new Date('2021-10-05 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1750,
          createdAt: new Date('2021-10-12 10:00:00'),
        },
        {
          id: 3,
          title: 'Freelance',
          type: 'deposit',
          category: 'Trabalho',
          amount: 3500,
          createdAt: new Date('2021-10-15 22:00:00'),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api'; //indica que todas as chamadas feitas com /api sejam captadas pelo miragejs

    //quando houver uma requisição do tipo get apara a rota /transactions
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transactions', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
