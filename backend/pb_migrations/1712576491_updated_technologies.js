/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews"
  }

  // remove
  collection.schema.removeField("ezxwn5et")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, subquery.technologies FROM (SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value as technologies FROM residency_reviews, JSON_EACH(technologies)) AS subquery"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezxwn5et",
    "name": "technologies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("5wjtgpic")

  return dao.saveCollection(collection)
})
