/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews, JSON_EACH(technologies)"
  }

  // remove
  collection.schema.removeField("sfzewr5t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qwyexxnz",
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
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM residency_reviews, JSON_EACH(technologies)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sfzewr5t",
    "name": "value",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("qwyexxnz")

  return dao.saveCollection(collection)
})
