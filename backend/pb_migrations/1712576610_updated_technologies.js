/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM residency_reviews, JSON_EACH(technologies)"
  }

  // remove
  collection.schema.removeField("ld6zcdns")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmj4xgzg",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, tech.value FROM residency_reviews, JSON_EACH(technologies) AS tech"
  }

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

  // remove
  collection.schema.removeField("dmj4xgzg")

  return dao.saveCollection(collection)
})
