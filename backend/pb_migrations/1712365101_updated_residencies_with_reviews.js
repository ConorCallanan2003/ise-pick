/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "SELECT residencies.name, residencies.description, residencies.logo, residencies.website, residencies.created, residency_reviews.score, residency_reviews.id FROM residencies LEFT JOIN residency_reviews on residency_reviews.residency=residencies.id GROUP BY residencies.id"
  }

  // remove
  collection.schema.removeField("twouaxyl")

  // remove
  collection.schema.removeField("ezh5dv8q")

  // remove
  collection.schema.removeField("bsjmqbjd")

  // remove
  collection.schema.removeField("jh1q9x0r")

  // remove
  collection.schema.removeField("atsckvlp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swlkn2pw",
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
    "id": "vqsdxagx",
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
    "id": "savz84hg",
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
    "id": "1mv0sehr",
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
    "id": "5xetyzyi",
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
    "query": "SELECT residencies.name, residencies.description, residencies.logo, residencies.website, residencies.created, residency_reviews.score, residency_reviews.id FROM residencies LEFT JOIN residency_reviews on residency_reviews.residency=residencies.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twouaxyl",
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
    "id": "ezh5dv8q",
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
    "id": "bsjmqbjd",
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
    "id": "jh1q9x0r",
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
    "id": "atsckvlp",
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
  collection.schema.removeField("swlkn2pw")

  // remove
  collection.schema.removeField("vqsdxagx")

  // remove
  collection.schema.removeField("savz84hg")

  // remove
  collection.schema.removeField("1mv0sehr")

  // remove
  collection.schema.removeField("5xetyzyi")

  return dao.saveCollection(collection)
})
