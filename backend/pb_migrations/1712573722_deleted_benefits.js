/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iwqvy3bkmue1u44");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "iwqvy3bkmue1u44",
    "created": "2024-04-05 21:55:53.870Z",
    "updated": "2024-04-05 22:04:28.256Z",
    "name": "benefits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gynzou4t",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
