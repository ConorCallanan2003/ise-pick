/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7")

  collection.viewRule = "@request.auth.id != \"\" && @request.auth.verified = true && @collection.residencies.name != \"Goblin Clothing\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7")

  collection.viewRule = "@request.auth.id != \"\" && @request.auth.verified = true"

  return dao.saveCollection(collection)
})
