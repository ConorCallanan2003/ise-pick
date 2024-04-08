/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "SELECT residencies.id, residencies.name, residencies.description, residencies.logo, residencies.website, residencies.created, residency_reviews.score FROM residencies FULL JOIN residency_reviews on residencies.id = residency_reviews.residency "
  }

  // remove
  collection.schema.removeField("ixdszxyk")

  // remove
  collection.schema.removeField("bqrmpmav")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ibvwmmwb",
    "name": "name",
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
    "id": "h39phoe3",
    "name": "description",
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
    "id": "mckbj114",
    "name": "logo",
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
    "id": "ddncoflw",
    "name": "website",
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
    "id": "y7hf72zl",
    "name": "score",
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
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "SELECT residencies.id, residencies.name, residency_reviews.score FROM residencies LEFT JOIN residency_reviews on residencies.id = residency_reviews.residency "
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ixdszxyk",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bqrmpmav",
    "name": "score",
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

  // remove
  collection.schema.removeField("ibvwmmwb")

  // remove
  collection.schema.removeField("h39phoe3")

  // remove
  collection.schema.removeField("mckbj114")

  // remove
  collection.schema.removeField("ddncoflw")

  // remove
  collection.schema.removeField("y7hf72zl")

  return dao.saveCollection(collection)
})
