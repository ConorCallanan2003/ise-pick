/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lj0rzzoy",
    "name": "website",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7")

  // remove
  collection.schema.removeField("lj0rzzoy")

  return dao.saveCollection(collection)
})
