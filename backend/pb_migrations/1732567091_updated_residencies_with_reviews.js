/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4x6msodgsedscpy")

  collection.options = {
    "query": "select residencies.id, residencies.name, residencies.description, residencies.logo, residencies.website, AVG(residency_reviews.score) as avgScore, COUNT(residency_reviews.score) as countScore FROM residencies LEFT JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residencies.id ORDER BY residencies.name "
  }

  // remove
  collection.schema.removeField("riquvdef")

  // remove
  collection.schema.removeField("fbrzu0ty")

  // remove
  collection.schema.removeField("ywrjakto")

  // remove
  collection.schema.removeField("ivzvf9v3")

  // remove
  collection.schema.removeField("jgsnaoqv")

  // remove
  collection.schema.removeField("64nbflqh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rasemewz",
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
    "id": "bh93gz1x",
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
    "id": "zmboki5w",
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
    "id": "ovyic2zp",
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
    "id": "3wkpowbj",
    "name": "avgScore",
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
    "id": "yekog1oe",
    "name": "countScore",
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
    "query": "select residencies.id, residencies.name, residencies.description, residencies.logo, residencies.website, AVG(residency_reviews.score) as avgScore, COUNT(residency_reviews.score) as countScore FROM residencies LEFT JOIN residency_reviews ON residencies.id = residency_reviews.residency GROUP BY residencies.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "riquvdef",
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
    "id": "fbrzu0ty",
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
    "id": "ywrjakto",
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
    "id": "ivzvf9v3",
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
    "id": "jgsnaoqv",
    "name": "avgScore",
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
    "id": "64nbflqh",
    "name": "countScore",
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
  collection.schema.removeField("rasemewz")

  // remove
  collection.schema.removeField("bh93gz1x")

  // remove
  collection.schema.removeField("zmboki5w")

  // remove
  collection.schema.removeField("ovyic2zp")

  // remove
  collection.schema.removeField("3wkpowbj")

  // remove
  collection.schema.removeField("yekog1oe")

  return dao.saveCollection(collection)
})
