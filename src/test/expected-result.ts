export const expectedResult = {
  orderUser: {
    store: [
      {
        create: { user_id: 70, name: 'Palmer Prosacco' },
        update: { name: 'Palmer Prosacco' },
        where: { user_id: 70 },
      },
      {
        create: { user_id: 75, name: 'Bobbie Batz' },
        update: { name: 'Bobbie Batz' },
        where: { user_id: 75 },
      },
      {
        create: { user_id: 49, name: 'Ken Wintheiser' },
        update: { name: 'Ken Wintheiser' },
        where: { user_id: 49 },
      },
      {
        create: { user_id: 14, name: 'Clelia Hills' },
        update: { name: 'Clelia Hills' },
        where: { user_id: 14 },
      },
      {
        create: { user_id: 57, name: 'Elidia Gulgowski IV' },
        update: { name: 'Elidia Gulgowski IV' },
        where: { user_id: 57 },
      },
      {
        create: { user_id: 80, name: 'Tabitha Kuhn' },
        update: { name: 'Tabitha Kuhn' },
        where: { user_id: 80 },
      },
      {
        create: { user_id: 23, name: 'Logan Lynch' },
        update: { name: 'Logan Lynch' },
        where: { user_id: 23 },
      },
      {
        create: { user_id: 15, name: 'Bonny Koss' },
        update: { name: 'Bonny Koss' },
        where: { user_id: 15 },
      },
      {
        create: { user_id: 17, name: 'Ethan Langworth' },
        update: { name: 'Ethan Langworth' },
        where: { user_id: 17 },
      },
    ],
  },
  order: {
    store: [
      {
        create: {
          order_id: 753,
          date: '2021-03-08T03:00:00.000Z',
          total: 3674.48,
          user_id: 70,
        },
        update: { date: '2021-03-08T03:00:00.000Z', total: 3674.48 },
        where: { order_id: 753 },
      },
      {
        create: {
          order_id: 798,
          date: '2021-11-16T03:00:00.000Z',
          total: 1578.57,
          user_id: 75,
        },
        update: { date: '2021-11-16T03:00:00.000Z', total: 1578.57 },
        where: { order_id: 798 },
      },
      {
        create: {
          order_id: 523,
          date: '2021-09-03T03:00:00.000Z',
          total: 586.74,
          user_id: 49,
        },
        update: { date: '2021-09-03T03:00:00.000Z', total: 586.74 },
        where: { order_id: 523 },
      },
      {
        create: {
          order_id: 146,
          date: '2021-11-25T03:00:00.000Z',
          total: 673.49,
          user_id: 14,
        },
        update: { date: '2021-11-25T03:00:00.000Z', total: 673.49 },
        where: { order_id: 146 },
      },
      {
        create: {
          order_id: 620,
          date: '2021-09-19T03:00:00.000Z',
          total: 1417.25,
          user_id: 57,
        },
        update: { date: '2021-09-19T03:00:00.000Z', total: 1417.25 },
        where: { order_id: 620 },
      },
      {
        create: {
          order_id: 877,
          date: '2021-06-12T03:00:00.000Z',
          total: 817.13,
          user_id: 80,
        },
        update: { date: '2021-06-12T03:00:00.000Z', total: 817.13 },
        where: { order_id: 877 },
      },
      {
        create: {
          order_id: 253,
          date: '2021-05-23T03:00:00.000Z',
          total: 322.12,
          user_id: 23,
        },
        update: { date: '2021-05-23T03:00:00.000Z', total: 322.12 },
        where: { order_id: 253 },
      },
      {
        create: {
          order_id: 153,
          date: '2021-07-01T03:00:00.000Z',
          total: 80.8,
          user_id: 15,
        },
        update: { date: '2021-07-01T03:00:00.000Z', total: 80.8 },
        where: { order_id: 153 },
      },
      {
        create: {
          order_id: 169,
          date: '2021-04-09T03:00:00.000Z',
          total: 865.18,
          user_id: 17,
        },
        update: { date: '2021-04-09T03:00:00.000Z', total: 865.18 },
        where: { order_id: 169 },
      },
    ],
  },
  orderItem: {
    store: [
      {
        data: {
          value: 1836.74,
          order_id: 753,
          product_id: 3,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 1837.74,
          order_id: 753,
          product_id: 3,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 1578.57,
          order_id: 798,
          product_id: 2,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 586.74,
          order_id: 523,
          product_id: 3,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 673.49,
          order_id: 146,
          product_id: 1,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 1417.25,
          order_id: 620,
          product_id: 0,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 817.13,
          order_id: 877,
          product_id: 3,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: {
          value: 322.12,
          order_id: 253,
          product_id: 2,
          status: 'DONE',
          comments: '',
        },
      },
      {
        data: { value: 80.8, order_id: 153, product_id: 4, status: 'DONE', comments: '' },
      },
      {
        data: {
          value: 865.18,
          order_id: 169,
          product_id: 0,
          status: 'DONE',
          comments: '',
        },
      },
    ],
  },
};
