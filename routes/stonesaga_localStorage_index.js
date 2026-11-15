// Generates the combination index used by the app:
//   _lsi  – list of all valid combination keys ("<material>:<rot>|<material>:<rot>")
//   _resa – for each key, the indexes (into _lsi) of all combinations that are the same recipe
//   _ls   – a localStorage template with every combination marked as Unknown
//   _res  – the groups of duplicate combinations
//
// Run with: node routes/stonesaga_localStorage_index.js
const fs = require('fs')
const path = require('path')
const {buildCombos, buildLocalStorage, groupDuplicates} = require('./stonesaga_materials')

const writeJSON = (file, data) =>
    fs.writeFileSync(path.join(__dirname, file), JSON.stringify(data, null, 2), 'utf8')

const {valid} = buildCombos()
const keys = valid.map(combo => combo.key)
const groups = groupDuplicates(valid.map(combo => combo.code6))

const groupByKey = {}
groups.forEach(group => group.forEach(index => {
    groupByKey[keys[index]] = group
}))

writeJSON('_ls.txt', buildLocalStorage(valid, groups))
writeJSON('_res.txt', groups)
writeJSON('_lsi.txt', keys)
writeJSON('_resa.txt', groupByKey)
writeJSON('../public/javascripts/_lsi.json', keys)
writeJSON('../public/javascripts/_resa.json', groupByKey)
