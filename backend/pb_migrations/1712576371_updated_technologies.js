/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM (SELECT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews) AS subquery, JSON_EACH(technologies)"
  }

  // remove
  collection.schema.removeField("h9mlnyx2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "55yai2rs",
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
    "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM (SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews) AS subquery, JSON_EACH(technologies)"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h9mlnyx2",
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
  collection.schema.removeField("55yai2rs")

  return dao.saveCollection(collection)
})
