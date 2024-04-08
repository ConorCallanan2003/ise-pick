/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6a22a08u9pgyu7l")

  collection.options = {
    "query": "SELECT test.id FROM (SELECT DISTINCT (ROW_NUMBER() OVER()) as id, technologies FROM residency_reviews) AS test"
  }

  // remove
  collection.schema.removeField("glxiipsz")

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
    "id": "glxiipsz",
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
})
