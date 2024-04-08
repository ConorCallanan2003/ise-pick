/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eg2z4il9edny6ac")

  collection.options = {
    "query": "SELECT residency_reviews.id, residency_reviews.benefits\nFROM residency_reviews\n"
  }

  // remove
  collection.schema.removeField("cstjioy2")

  // remove
  collection.schema.removeField("sq99u3cu")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eg2z4il9edny6ac")

  collection.options = {
    "query": "SELECT residency_reviews.id, key, value\nFROM residency_reviews, json_each(residency_reviews.benefits, '$.ALL');\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cstjioy2",
    "name": "key",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sq99u3cu",
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
  collection.schema.removeField("rnfxbyz2")

  return dao.saveCollection(collection)
})
