/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews, JSON_EACH(technologies)"
  }

  // remove
  collection.schema.removeField("nyhpiwly")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kztk7kcg",
    "name": "technologies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nyhpiwly",
    "name": "technologies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("kztk7kcg")

  return dao.saveCollection(collection)
})