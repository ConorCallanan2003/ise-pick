/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tw5gqoul",
    "name": "technologies",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2f3systa",
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
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  // remove
  collection.schema.removeField("tw5gqoul")

  // remove
  collection.schema.removeField("2f3systa")

  return dao.saveCollection(collection)
})
