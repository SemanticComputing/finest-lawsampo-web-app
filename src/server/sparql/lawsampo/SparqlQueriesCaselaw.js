export const caselawProperties = `
  {
    ?id sfcl:isRealizedBy ?expression__id . # expression = language version
    ?expression__id dcterms:title ?expression__prefLabel .
    ?expression__id dcterms:language ?lang .
    BIND(?expression__id as ?expression__dataProviderUrl)
    BIND(?expression__id as ?prefLabel__id)
    FILTER(?lang = 'fi')
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?expression__prefLabel as ?prefLabel__prefLabel)
    BIND(CONCAT("/caselaw/page/", REPLACE(STR(?id), "http://data.finlex.fi/ecli/", "")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id dcterms:creator ?court__id .
    ?court__id rdfs:label|skos:prefLabel ?court__prefLabel .
    FILTER(LANG(?court__prefLabel) = 'fi')
  }
  UNION
  {
    ?id dcterms:contributor ?judge__id .
    ?judge__id rdfs:label|skos:prefLabel ?judge__prefLabel .
  }
  UNION
  {
    ?id dcterms:description ?keywords__id .
    ?keywords__id skos:prefLabel ?keywords__prefLabel .
    FILTER(LANG(?keywords__prefLabel) = 'fi')
  }
  UNION
  {
    ?id dcterms:date ?decisionDate .
  }
  UNION
  {
    ?id sfcl:isRealizedBy/dcterms:abstract ?abstract .
    FILTER(LANG(?abstract) = 'fi')
  }
  UNION
  {
    ?id dcterms:isVersionOf ?ecli .
  }
  UNION
  {
    ?id sfcl:referenceToCaseLaw ?rcl__id .
    BIND(?rcl__id AS ?rcl__prefLabel)
  }
  UNION
  {
    ?id sfcl:referenceToLegislation ?rl__id .
    BIND(?rl__id AS ?rl__prefLabel)
  }
`