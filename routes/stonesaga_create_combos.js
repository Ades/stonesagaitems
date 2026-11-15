// TODO: Make a simle list of items. Click on item and show material requirement. (Orientation does not matter, however show code for combination when selected)
// TODO: setting has built structure STXX ("grinding") enables grinding setting and changes name of setting from STXX to "grinding"
// TODO: successful grinding of pigment enables Add pigment in settings — could also be automatically enabled when pigment is generated
// TODO: Add pigment material only if Pigment item is invented (override this behaviour in settings)
// TODO: Cooking pot enables two ingredients. Three ingredients are enabled by ...
// TODO: Show meals when corresponding structure is build (enable number as is done for grinding in settings)
// TODO: A switch in settings should enable "read all recepies on cards" and not only discovered.
// TODO: MAYBE Have a list of items and their combinations — quick guide to see what can be done.
// TODO: Group items into similar objects (eg. mallet, adze, axe, knife)
// TODO: Also show stats for items (number unknown, nothing, items)
// TODO: Show smaller items as smaller - make smaller images?
// TODO: Make internal list of items (Unknown, Nothing) and map them against codes
// TODO: Make icons in combo list rotate according to recipe
// TODO: NOT NECESSARY, automatic when tab closed: Missing combos should be sorted and enabled according to closed or open tab.
// TODO: NOT NECESSARY as it is easy to spot the missing sides: The number of missing Unknown recepies should be listed
// TODO: MAYBE Button to get next Unknown
// TODO: MAYBE: Mark when anything is completely explored
// TODO: MAYBE   hur hantera dupletter i wheel - låta den vara kvar? ...
// TODO: MAYBE make wheel categories exandable and closeable
// TODO: OLD Untested combos should be listed — when second slot (or first slot) empty, show mark on all available unknowns besides pips
// TODO: OLD In the same manner show item
// TODO: OLD: handle pigment (add image, section, combinations)
// TODO: OLD clearer show list of items created and their recepies
// TODO: DUPLICATE sort list of items
// TODO: DONE Save to file
// TODO: DONE Fix settings save.
// TODO: DONE Refresh after file loaded.
// TODO: DONE The list should show crafted (discovered) items (sorted) and all known recepies.
// TODO: DONE? Only list crafted items checkbox in settings - group by item - comboAll()
// TODO: DONE Gör endast en bild selekterbar. Runtomden ska visas alla kopplingar som kan göras.
// TODO: DONE   rotate all items 4 times for each direction
// TODO: DONE   sålla bort alla som börjar och slutar med 0
// TODO: DONE Grinding should be enabled when the structure is built (setting with only structure code enabled)
// TODO: DONE Show grinding result beside material.
// TODO: DONE Press combo in list to load two slots
// TODO: DONE Lägg bilder i egen katalog
// TODO: DONE Only show open categories combos from selected card.
// TODO: IRREPRODUCIBLE When adding Pigment (Other) rerender wheel


// Adjustments:
//         .card { //...
//             height: 72px;
//         .chip-img { // ...
//             /* height: 50px; */
//.center-card { // ..
//      height: 120px;
//.combo-thumb { // ...
//     /*height: 35px;*/
// .modal-thumb { //...
//     /*height: 52px;*/
//@font-face {font-family:'Trattatello'; src:url(Trattatello.ttf)}
// .trattatello {font-family:'Trattatello';}
//.subtitle {
//             font-family: 'Trattatello', serif;
//h1 {
//             font-family: 'Trattatello', serif;
//.category-label {
//             font-family: 'Trattatello', serif;
//.section-label {
//             font-family: 'Trattatello', serif;
// <div className="material-state" style="
//     display: flex;
//     justify-content: space-around;
//     width: 100%;
// ">
//     <div className="material-state"></div>
//     <div className="material-state">woven</div>
// </div>
// <div className="material-state">
//     <div>${stateLabel.split('/').length > 1 ? stateLabel.split('/')[0] : '     '}</div>
//     <div>${stateLabel.split('/').slice(-1)[0]}</div>
// </div>
//
//    function openCategories() {
//         return [...document.querySelectorAll('.section:not(:has(.is-collapsed))')].map(x=>x.getAttribute('data-cat'))
//     }

// Instruktion:
// kör, kopiera allt innehåll i ls.txt
// i chrome console: z=<paste>
// i chrome console: localStorage.setItem('stonesaga_combos_v2', JSON.stringify(z))
//

//
// const consoleFunction = () => {
//     q = (localStorage.getItem('stonesaga_combos_v2'))
//     qq = JSON.parse(q)
//     Object.keys(qq).filter(x => qq[x].craft.indexOf('Unknown') == -1).filter(x => qq[x].craft.indexOf('Nothing') == -1).map(x => qq[x])
// }
const fs = require('fs')
const path = require('path')
const {
    MATERIALS,
    buildCombos,
    buildLocalStorage,
    code5,
    code5Reversed,
    groupDuplicates,
} = require('./stonesaga_materials')

const COLORS = ['red', 'blue', 'purple', 'yellow']

const inDir = file => path.join(__dirname, file)
const writeJSON = (file, data) => fs.writeFileSync(inDir(file), JSON.stringify(data, null, 2), 'utf8')
const onlyUnique = (value, index, array) => array.indexOf(value) === index

// Results found so far, by code5. Used to pre-fill the localStorage template (ls.txt).

const KNOWN = {
    'B2232': 'IT21 Mallet',
    'B2231': 'ITxx Fishing spear',
    'B3555': 'ITxx Hide pack',
    'R1422': 'IT05 Riverstone spear',
    'R5622': 'IT22 Sunstone mallet',
    'Y2224': 'IT23 Cloudstone mallet',
    'B2243': 'ITxx Riverstone adze',
    'B1120': 'IT76 Piton',
    'B3530': 'IT30 Hide clothes',
    'B1111': 'IT29 Rope',
    'B2220': 'ITxx Toothed spear',
    'B1155': 'IT28 Woven basket',
    'B6340': 'IT54 Shell talisman',
    'B3550': 'IT38 Waterskin',
    'B1132': 'ITxx Walking stick',

    'R1522': 'IT67 Shell spear',
    'R1210': 'IT06 Wooden arrows',
    'R2344': 'ITxx Bone knife',
    'R3422': 'IT13 Riverstone adze',
    'R2343': 'IT02 Riverstone knife',
    'R2351': 'ITxx Shell pick ',
    'R2320': 'IT20 Tooth awl ',
    'R6640': 'IT48 Clay talisman',
    'R1322': 'ITxx Bone spear ',
    'R1632': 'IT61 Moonblood pick ',
    'R1622': 'IT58 Moonblood spear',
    'R2331': 'ITxx Bone awl',
    'R1432': 'IT12 Riverstone pick',

    'G': 'IT16 Sparkstones',

    'Y1111': 'IT29 Rope ',
    'Y2211': 'IT27 Travois',
    'Y1135': 'IT31 Sling',
    'Y1120': 'ITxx Necklace of teeth ',
    'Y3320': 'IT09 Wooden bow',
    'Y3230': 'IT41 Lyra',
    'Y2263': 'ITxx Shell adze',
    'Y2220': 'IT79 Atlatl',
    'Y5550': 'ITxx Rain coat',
    'Y3250': 'IT34 Torch',
    'Y3255': 'IT25 Broom',
    'Y5555': 'IT30 Fishing net',
    'Y3215': 'IT70 Shell axe',

    'Y4434': 'Nothing',
    'Y2150': 'Nothing',
    'Y4552': 'Nothing',
    'Y5511': 'Nothing',
    'Y6550': 'Nothing',
    'Y3223': 'Nothing',
    'Y5112': 'Nothing',

    'G4314': 'Nothing',
    'G6514': 'Nothing',
    'G3350': 'Nothing',

    'R4211': 'Nothing',
    'R1351': 'Nothing',
    'R4420': 'Nothing',
    'R2332': 'Nothing',
    'R1521': 'Nothing',
    'R1220': 'Nothing',
    'R3320': 'Nothing',
    'R3620': 'Nothing',
    'R6411': 'Nothing',
    'R4655': 'Nothing',
    'R1246': 'Nothing',
    'R1546': 'Nothing',
    'R4441': 'Nothing',

    'B2222': 'Nothing',
    'B6312': 'Nothing',
    'B6330': 'Nothing',
    'B6350': 'Nothing',
    'B6336': 'Nothing',
    'B2450': 'Nothing',
    'B2412': 'Nothing',

    'S6230': 'Nothing',
    'S6213': 'Nothing',

    'P6413': 'Nothing',
    'P6444': 'Nothing',
    'P6422': 'Nothing',
}

// Parses a ";"-separated file with a header row into a list of objects.
function parseCsv(csv) {
    const [headerLine, ...lines] = csv.split('\n')
    const headers = headerLine.split(';')
    return lines.map(line => {
        const values = line.split(';')
        const row = {}
        headers.forEach((header, i) => {
            row[header] = values[i]
        })
        return row
    })
}

const {valid, failed} = buildCombos()
const keys = valid.map(combo => combo.key)
const code6List = valid.map(combo => combo.code6)
const groups = groupDuplicates(code6List)

// One (possibly empty) list of codes per combination: the group that starts at that index.
const groupByStart = new Map(groups.map(group => [group[0], group]))
const groupCodes = valid.map((_, i) => (groupByStart.get(i) || []).map(index => code6List[index]))

// The crafting tables from the game, per colour, indexed by code.
const items = {}
COLORS.forEach(color => {
    const rows = parseCsv(fs.readFileSync(inDir(`../public/javascripts/stonesaga-crafting-${color}.csv`), 'utf8'))
    fs.writeFileSync(inDir(`${color}.json`), JSON.stringify(rows), 'utf8')
    items[color] = {}
    rows.forEach(row => {
        items[color][row.Code] = row
    })
})

// For each code5 (read from either end): the combinations that produce it,
// both as keys and as indexes into the key list.
const code5Notes = {}
const code5ItemListIndex = {}
valid.forEach(combo => {
    [code5(combo.code6), code5Reversed(combo.code6)]
        .filter(code => code[0] !== '0')
        .forEach(code => {
            (code5Notes[code] ||= []).push(combo.key);
            (code5ItemListIndex[code] ||= []).push(keys.indexOf(combo.key))
        })
})

const describe = combo => [
    combo.code6,
    code5(combo.code6),
    code5Reversed(combo.code6),
    combo.connection,
    combo.sides,
    combo.label,
    combo.key,
].join(';')

writeJSON('items.json', items)
writeJSON('a.txt', MATERIALS)
writeJSON('b.txt', valid.map(describe))
writeJSON('c.txt', code6List)
writeJSON('c5.txt', code6List.map(code5).filter(onlyUnique).sort())
writeJSON('failed.txt', failed.map(describe))
writeJSON('ls.txt', buildLocalStorage(valid, groups, KNOWN))
writeJSON('res.txt', groups)
writeJSON('resc.txt', groupCodes)
writeJSON('../public/javascripts/_code5_notes.json', code5Notes)
writeJSON('../public/javascripts/_code5_itemListIndex.json', code5ItemListIndex)
