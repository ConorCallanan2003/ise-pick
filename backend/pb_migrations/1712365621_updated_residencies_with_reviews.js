/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residency_reviews.residency"
  }

  // remove
  collection.schema.removeField("pu4t4lg9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7iqalepr",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pu4t4lg9",
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
  }))

  // remove
  collection.schema.removeField("7iqalepr")

  return dao.saveCollection(collection)
})
