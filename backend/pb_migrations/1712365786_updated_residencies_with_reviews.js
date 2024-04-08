/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name, residencies.description, residencies.logo, residencies.website, AVG(residency_reviews.score) as avgScore FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residency_reviews.residency"
  }

  // remove
  collection.schema.removeField("pjadqhc8")

  // remove
  collection.schema.removeField("ivp8jgw9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aalcszyj",
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
    "id": "yvlcyily",
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
    "id": "lu39ln8e",
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
    "id": "s7hojaix",
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
    "id": "jbtbzh6y",
    "name": "avgScore",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name, AVG(residency_reviews.score) as avgScore FROM residencies INNER JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residency_reviews.residency"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pjadqhc8",
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
    "id": "ivp8jgw9",
    "name": "avgScore",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("aalcszyj")

  // remove
  collection.schema.removeField("yvlcyily")

  // remove
  collection.schema.removeField("lu39ln8e")

  // remove
  collection.schema.removeField("s7hojaix")

  // remove
  collection.schema.removeField("jbtbzh6y")

  return dao.saveCollection(collection)
})
