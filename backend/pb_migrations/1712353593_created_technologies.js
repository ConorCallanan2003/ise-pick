/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ex9jgusk6m9zk0v",
    "created": "2024-04-05 21:46:33.934Z",
    "updated": "2024-04-05 21:46:33.934Z",
    "name": "technologies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "n3an2dcm",
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
      },
      {
        "system": false,
        "id": "eztdpnum",
        "name": "type",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("ex9jgusk6m9zk0v");

  return dao.deleteCollection(collection);
})
