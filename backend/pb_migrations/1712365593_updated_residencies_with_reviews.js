/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency"
  }

  // remove
  collection.schema.removeField("pp3s72wp")

  // remove
  collection.schema.removeField("cbi2jrf6")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residency_reviews.id, residency_reviews.residency, residency_reviews.score from residency_reviews"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pp3s72wp",
    "name": "residency",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qrdsbht2cxjo7a7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbi2jrf6",
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
  }))

  // remove
  collection.schema.removeField("pu4t4lg9")

  return dao.saveCollection(collection)
})
