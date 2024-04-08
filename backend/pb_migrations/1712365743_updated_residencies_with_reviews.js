/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name, AVG(residency_reviews.score) as avgFUCK FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residency_reviews.residency"
  }

  // remove
  collection.schema.removeField("7iqalepr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oulphutf",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "umckz1tq",
    "name": "avgFUCK",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residency_reviews.residency"
  }

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

  // remove
  collection.schema.removeField("oulphutf")

  // remove
  collection.schema.removeField("umckz1tq")

  return dao.saveCollection(collection)
})
