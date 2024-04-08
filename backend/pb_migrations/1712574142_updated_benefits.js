/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eg2z4il9edny6ac")

  collection.options = {
    "query": "SELECT DISTINCT (ROW_NUMBER() OVER()) as id, benefits FROM residency_reviews, JSON_EACH(benefits) \n"
  }

  // remove
  collection.schema.removeField("rnfxbyz2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jb6mpoq0",
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
  const collection = dao.findCollectionByNameOrId("eg2z4il9edny6ac")

  collection.options = {
    "query": "SELECT residency_reviews.id, residency_reviews.benefits\nFROM residency_reviews\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rnfxbyz2",
    "name": "benefits",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("jb6mpoq0")

  return dao.saveCollection(collection)
})
