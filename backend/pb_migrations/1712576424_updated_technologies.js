/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM (SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value as technologies FROM residency_reviews, JSON_EACH(technologies)) AS subquery, JSON_EACH(subquery.technologies)"
  }

  // remove
  collection.schema.removeField("t1rysiqg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ajaltewo",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM (SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value as technologies FROM residency_reviews, JSON_EACH(technologies)) AS subquery, JSON_EACH(technologies)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t1rysiqg",
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
  collection.schema.removeField("ajaltewo")

  return dao.saveCollection(collection)
})
