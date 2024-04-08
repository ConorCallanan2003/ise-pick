/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "iwqvy3bkmue1u44",
    "created": "2024-04-05 21:55:53.870Z",
    "updated": "2024-04-05 21:55:53.870Z",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("iwqvy3bkmue1u44");

  return dao.deleteCollection(collection);
})
