/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "h14qqkcomv6d9j1",
    "created": "2024-11-10 13:36:54.824Z",
    "updated": "2024-11-10 13:36:54.824Z",
    "name": "residency_reviews",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dczxgmnd",
        "name": "score",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "xyklkweg",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "82teidfn",
        "name": "residency",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "qrdsbht2cxjo7a7",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "hq6jtdam",
        "name": "salary",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "tw5gqoul",
        "name": "technologies",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "2f3systa",
        "name": "benefits",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "9vvqybdi",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "createRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "deleteRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1");

  return dao.deleteCollection(collection);
})
