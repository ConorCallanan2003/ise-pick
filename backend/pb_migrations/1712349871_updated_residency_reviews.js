/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hq6jtdam",
    "name": "salary",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  // remove
  collection.schema.removeField("hq6jtdam")

  return dao.saveCollection(collection)
})
