/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6a22a08u9pgyu7l",
    "created": "2024-11-10 13:36:54.825Z",
    "updated": "2024-11-10 13:36:54.838Z",
    "name": "technologies",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "saemuizq",
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
      "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM residency_reviews, JSON_EACH(technologies) GROUP BY JSON_EACH.value"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l");

  return dao.deleteCollection(collection);
})
