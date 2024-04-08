/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "SELECT residencies.id, residencies.name, residency_reviews.score FROM residencies LEFT JOIN residency_reviews on residencies.id = residency_reviews.residency "
  }

  // remove
  collection.schema.removeField("48zik5nr")

  // remove
  collection.schema.removeField("abxfbctf")

  // remove
  collection.schema.removeField("fbsqdw9m")

  // remove
  collection.schema.removeField("3incmu6b")

  // remove
  collection.schema.removeField("bzfe8m2f")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "SELECT residencies.id, residencies.name, residencies.description, residencies.logo, residencies.website, residency_reviews.score FROM residencies LEFT JOIN residency_reviews on residencies.id = residency_reviews.residency"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "48zik5nr",
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
    "id": "abxfbctf",
    "name": "description",
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
    "id": "fbsqdw9m",
    "name": "logo",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3incmu6b",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bzfe8m2f",
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
  collection.schema.removeField("ixdszxyk")

  // remove
  collection.schema.removeField("bqrmpmav")

  return dao.saveCollection(collection)
})
