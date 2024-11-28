/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eg2z4il9edny6ac",
    "created": "2024-11-10 13:36:54.825Z",
    "updated": "2024-11-10 13:36:54.830Z",
    "name": "benefits",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ijynr9p9",
        "name": "value",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM residency_reviews, JSON_EACH(benefits) GROUP BY JSON_EACH.value"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eg2z4il9edny6ac");

  return dao.deleteCollection(collection);
})
