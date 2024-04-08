/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6a22a08u9pgyu7l",
    "created": "2024-04-08 11:03:03.146Z",
    "updated": "2024-04-08 11:03:03.146Z",
    "name": "technologies",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pscboijx",
        "name": "technologies",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews, JSON_EACH(technologies) "
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l");

  return dao.deleteCollection(collection);
})
