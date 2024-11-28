/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qrdsbht2cxjo7a7",
    "created": "2024-11-10 13:36:54.824Z",
    "updated": "2024-11-10 13:36:54.824Z",
    "name": "residencies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6crvii3n",
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
        "id": "9ldg9dsc",
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
        "id": "uhqa2pac",
        "name": "logo",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "lj0rzzoy",
        "name": "website",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7");

  return dao.deleteCollection(collection);
})
