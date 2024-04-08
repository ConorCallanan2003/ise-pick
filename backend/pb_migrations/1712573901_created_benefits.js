/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eg2z4il9edny6ac",
    "created": "2024-04-08 10:58:21.607Z",
    "updated": "2024-04-08 10:58:21.607Z",
    "name": "benefits",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cstjioy2",
        "name": "key",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "sq99u3cu",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT residency_reviews.id, key, value\nFROM residency_reviews, json_each(residency_reviews.benefits, '$.ALL');\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eg2z4il9edny6ac");

  return dao.deleteCollection(collection);
})
