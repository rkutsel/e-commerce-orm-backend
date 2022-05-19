### MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Object-Relational Mapping Back End For E-Commerce

## Description

A very minimal boilerplate for an e-commerce backend API. It uses `MySQL RDBMS`, [Sequelize](https://sequelize.org/v5/) to decouple from backend and [Express](https://expressjs.com/) that handles HTTP requests.

## Installation Instructions

> NOTE: Make sure you have `Node.JS ~v16.14.2` and `NPM ~8.5.0` installed. You can quickly check this by running `node -v` for Node.JS and `npm -v` for NPM in your terminal. Additionally it requires `mysql ~8.0.29`

### Install local dependencies

Once the above is confirmed, clone the repo `git clone git@github.com:rkutsel/e-commerce-orm-backend.git` and install the dependencies by running `npm i` in your terminal. I recommend you install them locally. A successful installation should look somewhat similar to the one bellow:

```bash
added 224 packages, and audited 225 packages in 6s

25 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Setup .env credentials
Rename `.env.EXAMPLE` to `.env`. Open the `.env` file and change the variables as needed. 


> ./db directory has schema.sql that needs to be imported into your MySQL. Note: this set up is not meant to be run in production.

### Import DB schema and seed data into MySQL

```bash
# from the root directory run:
mysql -u root -p < db/schema.sql
node seeds/index.js
```

## Usage with Examples

To get your started simply run `node server` or `npm start dev` which should fire up all of the components. At this point you should be able to consume the API. You can use any API client. For demo purposes bellow are a few examples:

```bash
# Create a new product with multiple tags:
>curl -X POST http://localhost:3001/api/products \
-H 'Content-Type: application/json' \
-d '{"product_name": "Desktop", "price": 600, "stock": 3, "tagIds": [1, 2, 3, 4]}'

#response
[{"id":17,"productId":13,"tagId":1},{"id":18,"productId":13,"tagId":2},{"id":19,"productId":13,"tagId":3},{"id":20,"productId":13,"tagId":4}]%

# Get a list of all products:
>curl -X GET http://localhost:3001/api/products

#response
[{"id":1,"product_name":"Plain T-Shirt","price":15,"stock":14,"category_id":1,"categoryId":1,"category":{"id":1,"category_name":"Shirts"},"tags":[{"id":6,"tag_name":"white"},{"id":7,"tag_name":"gold"},{"id":8,"tag_name":"pop culture"}]},{"id":5,"product_name":"Cargo Shorts","price":30,"stock":22,"category_id":2,"categoryId":2,"category":{"id":2,"category_name":"Shorts"},"tags":[{"id":3,"tag_name":"blue"}]},{"id":4,"product_name":"Top 40 Music Compilation Vinyl Record","price":13,"stock":50,"category_id":3,"categoryId":3,"category":{"id":3,"category_name":"Music"},"tags":[{"id":1,"tag_name":"rock music"},{"id":2,"tag_name":"pop music"},{"id":8,"tag_name":"pop culture"}]},{"id":3,"product_name":"Branded Baseball Hat","price":23,"stock":12,"category_id":4,"categoryId":4,"category":{"id":4,"category_name":"Hats"},"tags":[{"id":1,"tag_name":"rock music"},{"id":3,"tag_name":"blue"},{"id":4,"tag_name":"red"},{"id":5,"tag_name":"green"}]},{"id":2,"product_name":"Running Sneakers","price":90,"stock":25,"category_id":5,"categoryId":5,"category":{"id":5,"category_name":"Shoes"},"tags":[{"id":6,"tag_name":"white"}]}]%
```
