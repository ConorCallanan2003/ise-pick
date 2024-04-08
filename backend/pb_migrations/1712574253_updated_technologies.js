/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, benefits FROM residency_reviews, JSON_EACH(technologies) "
  }

  // remove
  collection.schema.removeField("kv1v07vo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vapipqgu",
    "name": "benefits",
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
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, json_each.value FROM residency_reviews, JSON_EACH(technologies) "
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kv1v07vo",
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
  collection.schema.removeField("vapipqgu")

  return dao.saveCollection(collection)
})
