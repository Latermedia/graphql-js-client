# graphql-js-client

Feature light client library for fetching resources via GraphQL

## Table Of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](http://github.com/Shopify/graphql-js-client/blob/master/LICENSE.md)

## Installation
```bash
$ yarn install graphql-js-client
```

## Examples

#### Creating and sending a query

```javascript
import GraphQLClient from 'graphql-js-client';

// This is the generated type bundle from graphql-js-schema
import types from './types.js';

const client = new GraphQLClient(types, 'https://graphql.myshopify.com/api/graphql', {
  headers: `Authorization: Basic ${btoa('some-storefront-access-token')}`
});

const products = [];

client.send(client.query((root) => {
  root.add('shop', (shop) => {
    shop.add('name');
    shop.addConnection('products', {args: {first: 10}}, (product) => {
      product.add('title');
    });
  });
}).then((shopModel) => {
  console.log(shopModel);

  if (shopModel.products.hasNextPage) {

    products.push(...shopModel.products);

    return client.send(shopModel.products.nextPageQuery());
  };
}).then((shopModel) => {
  products.push(...shopModel.products); // Page two of products
});
```

## Contributing

#### Setting up:

```bash
$ git clone git@github.com:Shopify/graphql-js-client.git
$ cd graphql-js-client
$ yarn install
```

#### Running the tests in a browser

```bash
$ yarn start
```

Then visit [http://localhost:4200](http://localhost:4200)

#### Running the tests in node

```bash
$ yarn test
```

## License

MIT, see [LICENSE.md](http://github.com/Shopify/graphql-js-client/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
