/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, tech.value FROM residency_reviews, JSON_EACH(technologies) AS tech"
  }

  // remove
  collection.schema.removeField("5wjtgpic")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ld6zcdns",
    "name": "value",
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
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5wjtgpic",
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
  collection.schema.removeField("ld6zcdns")

  return dao.saveCollection(collection)
})
