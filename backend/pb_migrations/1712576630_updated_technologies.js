/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM residency_reviews, JSON_EACH(technologies) GROUP BY JSON_EACH.value"
  }

  // remove
  collection.schema.removeField("dmj4xgzg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elntj4hz",
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
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM residency_reviews, JSON_EACH(technologies)"
  }

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

  // remove
  collection.schema.removeField("elntj4hz")

  return dao.saveCollection(collection)
})
