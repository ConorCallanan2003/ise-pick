/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "h14qqkcomv6d9j1",
    "created": "2024-04-05 19:40:46.940Z",
    "updated": "2024-04-05 19:40:46.940Z",
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
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1");

  return dao.deleteCollection(collection);
})
