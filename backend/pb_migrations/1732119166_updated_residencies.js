/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7")

  collection.viewRule = "@request.auth.id != \"\" && @request.auth.verified = true && id != \"7comb76jjb797ux\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qrdsbht2cxjo7a7")

  collection.viewRule = "@request.auth.id != \"\" && @request.auth.verified = true && @request.data.id != \"7comb76jjb797ux\""

  return dao.saveCollection(collection)
})
