/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4x6msodgsedscpy",
    "created": "2024-11-10 13:36:54.825Z",
    "updated": "2024-11-10 13:36:54.835Z",
    "name": "residencies_with_reviews",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gyflbaca",
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
        "id": "led4lkbb",
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
        "id": "bvui4vk5",
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
        "id": "hp1pmtmh",
        "name": "website",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "ork5mf6i",
        "name": "avgScore",
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
        "id": "mflsc920",
        "name": "countScore",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select residencies.id, residencies.name, residencies.description, residencies.logo, residencies.website, AVG(residency_reviews.score) as avgScore, COUNT(residency_reviews.score) as countScore FROM residencies LEFT JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residencies.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy");

  return dao.deleteCollection(collection);
})
