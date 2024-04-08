/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, JSON_EACH.value FROM (SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews) AS subquery, JSON_EACH(technologies)"
  }

  // remove
  collection.schema.removeField("xvrpwzh3")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id, test.technologies FROM (SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews) AS test"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xvrpwzh3",
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
  collection.schema.removeField("h9mlnyx2")

  return dao.saveCollection(collection)
})
