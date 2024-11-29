/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h14qqkcomv6d9j1")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.verified = true"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.verified = true"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.verified = true"

  return dao.saveCollection(collection)
})
