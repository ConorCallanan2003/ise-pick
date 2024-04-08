/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "82teidfn",
    "name": "residency",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qrdsbht2cxjo7a7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  // remove
  collection.schema.removeField("82teidfn")

  return dao.saveCollection(collection)
})
