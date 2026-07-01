// TODO: A switch in settings should enable "read all recepies on cards" and not only discovered.
// TODO: Show meals when corresponding structure is build (enable number as is done for grinding in settings)
// TODO: Have a list of items and their combinations — quick guide to see what can be done.
// TODO: Group items into similar objects (eg. mallet, adze, axe, knife)
// TODO: Also show stats for items (number unknown, nothing, items)
// TODO: Show smaller items as smaller - make smaller images?
// TODO: Make internal list of items (Unknown, Nothing) and map them against codes
// TODO: Make icons in combo list rotate according to recipe
// TODO: MAYBE Button to get next Unknown
// TODO: MAYBE: Mark when anything is completely explored
// TODO: NOT NECESSARY, automatic when tab closed: Missing combos should be sorted and enabled according to closed or open tab.
// TODO: NOT NECESSARY as it is easy to spot the missing sides: The number of missing Unknown recepies should be listed
// TODO: MAYBE   hur hantera dupletter i wheel - låta den vara kvar? ...
// TODO: MAYBE make wheel categories exandable and closeable
// TODO: OLD Untested combos should be listed — when second slot (or first slot) empty, show mark on all available unknowns besides pips
// TODO: OLD In the same manner show item
// TODO: OLD: handle pigment (add image, section, combinations)
// TODO: OLD clearer show list of items created and their recepies
// TODO: DUPLICATE sort list of items
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
const consoleFunction = () => {
    q = (localStorage.getItem('stonesaga_combos_v2'))
    qq = JSON.parse(q)
    Object.keys(qq).filter(x => qq[x].craft.indexOf('Unknown') == -1).filter(x => qq[x].craft.indexOf('Nothing') == -1).map(x => qq[x])
}
const fs = require('fs');

function codes(x) {
    return [x.w + x.e,
        x.n + x.s,
        x.e + x.w,
        x.s + x.n]
        // .filter(x=>!!x)
        .map(x => x.replaceAll('0', '00'))
}

const strReverse = (x) => x.split('').reverse().join('')
const onlyUnique = (value, index, array) => array.indexOf(value) === index
let a = [{
    item: 'bone',
    type: 'animal',
    note: 'animal__Bone__0',
    tool: '',
    process_1: 'drill',
    process_2: 'cut',
    w: 'B2',
    n: 'Y3',
    e: 'Y2',
    s: 'R2',
    cols: ['B', 'Y', 'Y', 'R'].filter(x => !!x),
    vals: ['2', '3', '2', '2'].filter(x => !!x)
}, {
    item: 'bone, carved',
    type: 'animal',
    note: 'animal__Bone__1',
    tool: 'drill',
    process_1: '',
    process_2: '',
    w: 'R1',
    n: 'R4',
    e: 'Y3',
    s: 'Y4',
    cols: ['R', 'R', 'Y', 'Y'].filter(x => !!x),
    vals: ['1', '4', '3', '4'].filter(x => !!x)
}, {
    item: 'hide',
    type: 'animal',
    note: 'animal__Hide__0',
    tool: '',
    process_1: 'drill',
    process_2: 'cut',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'hide, cured',
    type: 'animal',
    note: 'animal__Hide__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'B3',
    n: '',
    e: 'R5',
    s: '',
    cols: ['B', '', 'R', ''].filter(x => !!x),
    vals: ['3', '', '5', ''].filter(x => !!x)
}, {
    item: 'shell',
    type: 'animal',
    note: 'animal__Shell__0',
    tool: '',
    process_1: 'drill',
    process_2: 'grind',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'shell, sharpened',
    type: 'animal',
    note: 'animal__Shell__1',
    tool: 'cut',
    process_1: '',
    process_2: '',
    w: 'B6',
    n: 'Y5',
    e: 'R3',
    s: 'R1',
    cols: ['B', 'Y', 'R', 'R'].filter(x => !!x),
    vals: ['6', '5', '3', '1'].filter(x => !!x)
}, {
    item: 'guts',
    type: 'animal',
    note: 'animal__Guts__0',
    tool: '',
    process_1: 'heat',
    process_2: 'cut',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'guts, cured',
    type: 'animal',
    note: 'animal__Guts__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'Y1',
    n: '0',
    e: 'B1',
    s: 'R3',
    cols: ['Y', '0', 'B', 'R'].filter(x => !!x),
    vals: ['1', '0', '1', '3'].filter(x => !!x)
}, {
    item: 'feather',
    type: 'animal',
    note: 'animal__Feather__0',
    tool: '',
    process_1: 'cut',
    process_2: '',
    w: '0',
    n: '',
    e: 'B1',
    s: '',
    cols: ['0', '', 'B', ''].filter(x => !!x),
    vals: ['0', '', '1', ''].filter(x => !!x)
}, {
    item: 'feather, cut',
    type: 'animal',
    note: 'animal__Feather__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'Y1',
    n: '',
    e: '0',
    s: '',
    cols: ['Y', '', '0', ''].filter(x => !!x),
    vals: ['1', '', '0', ''].filter(x => !!x)
}, {
    item: 'tooth',
    type: 'animal',
    note: 'animal__Tooth__0',
    tool: 'drill',
    process_1: 'drill',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'tooth, drilled',
    type: 'animal',
    note: 'animal__Tooth__1',
    tool: 'drill',
    process_1: '',
    process_2: '',
    w: 'B2',
    n: 'Y2',
    e: '0',
    s: '0',
    cols: ['B', 'Y', '0', '0'].filter(x => !!x),
    vals: ['2', '2', '0', '0'].filter(x => !!x)
}, {
    item: 'clay',
    type: 'mineral',
    note: 'mineral__Clay__0',
    tool: '',
    process_1: 'heat',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'clay, fired',
    type: 'mineral',
    note: 'mineral__Clay__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'R6',
    n: '',
    e: 'R6',
    s: '',
    cols: ['R', '', 'R', ''].filter(x => !!x),
    vals: ['6', '', '6', ''].filter(x => !!x)
}, {
    item: 'cloudstone',
    type: 'mineral',
    note: 'mineral__Cloudstone__0',
    tool: '',
    process_1: 'grind',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'cloudstone, shaped',
    type: 'mineral',
    note: 'mineral__Cloudstone__1',
    tool: 'strike',
    process_1: '',
    process_2: '',
    w: 'B5',
    n: 'R4',
    e: 'Y4',
    s: 'B2',
    cols: ['B', 'R', 'Y', 'B'].filter(x => !!x),
    vals: ['5', '4', '4', '2'].filter(x => !!x)
}, {
    item: 'riverstone',
    type: 'mineral',
    note: 'mineral__Riverstone__0',
    tool: '',
    process_1: 'strike',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'riverstone, flaked',
    type: 'mineral',
    note: 'mineral__Riverstone__1',
    tool: 'cut',
    process_1: '',
    process_2: '',
    w: 'R1',
    n: 'Y4',
    e: 'Y4',
    s: 'R3',
    cols: ['R', 'Y', 'Y', 'R'].filter(x => !!x),
    vals: ['1', '4', '4', '3'].filter(x => !!x)
}, {
    item: 'sunstone',
    type: 'mineral',
    note: 'mineral__Sunstone__0',
    tool: 'grind',
    process_1: 'grind',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'sunstone, shaped',
    type: 'mineral',
    note: 'mineral__Sunstone__1',
    tool: 'grind',
    process_1: '',
    process_2: '',
    w: 'R5',
    n: '',
    e: 'Y6',
    s: '',
    cols: ['R', '', 'Y', ''].filter(x => !!x),
    vals: ['5', '', '6', ''].filter(x => !!x)
}, {
    item: 'wood',
    type: 'plant',
    note: 'plant__Wood__0',
    tool: '',
    process_1: 'heat',
    process_2: 'cut',
    w: 'B2',
    n: 'R2',
    e: 'Y2',
    s: 'Y3',
    cols: ['B', 'R', 'Y', 'Y'].filter(x => !!x),
    vals: ['2', '2', '2', '3'].filter(x => !!x)
}, {
    item: 'wood, hardened',
    type: 'plant',
    note: 'plant__Wood__1',
    tool: 'drill',
    process_1: '',
    process_2: '',
    w: 'R1',
    n: 'R3',
    e: 'Y2',
    s: 'Y3',
    cols: ['R', 'R', 'Y', 'Y'].filter(x => !!x),
    vals: ['1', '3', '2', '3'].filter(x => !!x)
}, {
    item: 'fiber',
    type: 'plant',
    note: 'plant__Fiber__0',
    tool: '',
    process_1: 'cut',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'fiber, woven',
    type: 'plant',
    note: 'plant__Fiber__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'Y1',
    n: 'Y5',
    e: 'B1',
    s: 'R5',
    cols: ['Y', 'Y', 'B', 'R'].filter(x => !!x),
    vals: ['1', '5', '1', '5'].filter(x => !!x)
}, {
    item: 'pitch',
    type: 'plant',
    note: 'plant__Pitch__0',
    tool: '',
    process_1: 'heat',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'pitch, treated',
    type: 'plant',
    note: 'plant__Pitch__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'R5',
    n: '',
    e: '0',
    s: '',
    cols: ['R', '', '0', ''].filter(x => !!x),
    vals: ['5', '', '0', ''].filter(x => !!x)
}, {
    item: 'moonblood',
    type: 'rare',
    note: 'rare__Moonblood__0',
    tool: '',
    process_1: 'moon',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'moonblood, solid',
    type: 'rare',
    note: 'rare__Moonblood__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'R1',
    n: 'R2',
    e: 'Y6',
    s: 'S6',
    cols: ['R', 'R', 'Y', 'S'].filter(x => !!x),
    vals: ['1', '2', '6', '6'].filter(x => !!x)
}, {
    item: 'coral, dead',
    type: 'rare',
    note: 'rare__Coral__0',
    tool: '',
    process_1: 'comet',
    process_2: '',
    w: '',
    n: '',
    e: '',
    s: '',
    cols: ['', '', '', ''].filter(x => !!x),
    vals: ['', '', '', ''].filter(x => !!x)
}, {
    item: 'coral, living',
    type: 'rare',
    note: 'rare__Coral__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'P6',
    n: 'P6',
    e: 'R4',
    s: 'Y4',
    cols: ['P', 'P', 'R', 'Y'].filter(x => !!x),
    vals: ['6', '6', '4', '4'].filter(x => !!x)
}, {
    item: 'silk',
    type: 'rare',
    note: 'rare__Silk__0',
    tool: '',
    process_1: 'energy',
    process_2: '',
    w: 'B1',
    n: 'R3',
    e: 'Y1',
    s: '0',
    cols: ['B', 'R', 'Y', '0'].filter(x => !!x),
    vals: ['1', '3', '1', '0'].filter(x => !!x)
}, {
    item: 'silk, woven',
    type: 'rare',
    note: 'rare__Silk__1',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'B2',
    n: '',
    e: 'R5',
    s: '',
    cols: ['B', '', 'R', ''].filter(x => !!x),
    vals: ['2', '', '5', ''].filter(x => !!x)
}, {
    item: 'pigment',
    type: 'item',
    note: '',
    tool: '',
    process_1: '',
    process_2: '',
    w: 'R4',
    n: '',
    e: '0',
    s: '',
    cols: ['R', '', '0', ''].filter(x => !!x),
    vals: ['4', '', '0', ''].filter(x => !!x)
}];
a.forEach(x => x.codes = codes(x))
b = []
failed = []
c = []
ls = {}
lsindextokey = []
count = 0
for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
        for (let k = 0; k < a[i].codes.length; k++) {
            for (let l = 0; l < a[j].codes.length; l++) {
                const item1 = a[i].codes[k]
                const item2 = a[j].codes[l]
                const start = item1.replace(/(.).../, '$1')
                const end = item2.replace(/..(.)./, '$1')
                const code = item1.replace(/(..).(.)/, '$1$2') + item2.replace(/.(.).(.)/, '$1$2') + end
                const conn1 = item1.replace(/..(.)./, '$1')
                const conn2 = item2.replace(/(.).../, '$1')
                const bstr = code + ' ' + conn1 + conn2 + ' ' + a[i].codes[k] + a[j].codes[l] + end + ` ${a[i].item}(${k}) + ${a[j].item}(${l})`
                if (conn1 == conn2 && conn1 != '' && start != '0' && conn1 != '0' && conn2 != '0') {
                    // console.log('HERE',a[i],a[j])
                    b.push(bstr)
                    // b.push(code + ' ' + ` ${a[i].item}(${k}) + ${a[j].item}(${l})  ${a[i].note}(${k}) + ${a[j].note}(${l})`)
                    c.push(code)
                    const g = [0, 270, 180, 90]
                    let items = `${a[i].note}:${g[k]}|${a[j].note}:${g[l]}`;
                    // let items = `${a[j].note}:${g[l]}|${a[i].note}:${g[k]}`;
                    ls[items] = {craft: '<b style=background-color:red>Unknown</b>', desc: 'Unknown'}
                    lsindextokey.push(items)
                } else {
                    failed.push(bstr)
                }
            }
        }
    }
}
cc = c.map(x => x.replace(/(.....)./, '$1'))
cr = c.map(x => strReverse(x))
ccr = cr.map(x => x.replace(/(.....)./, '$1'))
const code6 = c
// const code6 = [
//     "B2232R",
//     "B2222B",
//     "Y3223Y",
//     "Y2222Y",
//     "R2332R",
//     "R2322B",
//     "B2231R",
//     "B2244R",
//     "Y3213Y",
//     "Y3244Y",
//     "R2331R",
//     "R2344R",
//     "Y3253B",
//     "Y2235R",
//     "B2251R",
//     "Y3236B",
//     "Y3215Y",
//     "Y2263R",
//     "R2351R",
//     "B2211B",
//     "Y32300",
//     "Y2211Y",
//     "R2311B",
//     "Y22100",
//     "B22100",
//     "R23100",
//     "B22200",
//     "Y22200",
//     "R23200",
//     "Y3266R",
//     "Y3266R",
//     "B2245B",
//     "Y3242B",
//     "Y2254Y",
//     "Y2224R",
//     "R2345B",
//     "B2243R",
//     "B2241R",
//     "Y3214Y",
//     "Y3234Y",
//     "R2343R",
//     "R2341R",
//     "B2265R",
//     "Y3256Y",
//     "R2365R",
//     "B2222B",
//     "B2232R",
//     "Y3223Y",
//     "Y2222Y",
//     "R2322B",
//     "R2332R",
//     "B2221R",
//     "B2233R",
//     "Y3212Y",
//     "Y3233Y",
//     "R2321R",
//     "R2333R",
//     "B2211B",
//     "B2255R",
//     "Y3255Y",
//     "Y2211Y",
//     "R2311B",
//     "R2355R",
//     "Y32500",
//     "B2261R",
//     "Y3216Y",
//     "Y3226S",
//     "R2361R",
//     "B2246P",
//     "Y3246P",
//     "R2346P",
//     "B2211B",
//     "Y32300",
//     "Y2211Y",
//     "R2311B",
//     "Y3252B",
//     "Y2225R",
//     "Y32400",
//     "R1331R",
//     "R1344R",
//     "R4431R",
//     "R4444R",
//     "Y3113Y",
//     "Y3144Y",
//     "Y4413Y",
//     "Y4444Y",
//     "Y3153B",
//     "Y4453B",
//     "R1351R",
//     "R4451R",
//     "Y3136B",
//     "Y3115Y",
//     "Y4436B",
//     "Y4415Y",
//     "R1311B",
//     "R4411B",
//     "Y31300",
//     "Y44300",
//     "R13100",
//     "R44100",
//     "R13200",
//     "R44200",
//     "Y3166R",
//     "Y3166R",
//     "Y4466R",
//     "Y4466R",
//     "R1345B",
//     "R4445B",
//     "Y3142B",
//     "Y4442B",
//     "R1343R",
//     "R1341R",
//     "R4443R",
//     "R4441R",
//     "Y3114Y",
//     "Y3134Y",
//     "Y4414Y",
//     "Y4434Y",
//     "R1365R",
//     "R4465R",
//     "Y3156Y",
//     "Y4456Y",
//     "R1322B",
//     "R1332R",
//     "R4422B",
//     "R4432R",
//     "Y3123Y",
//     "Y4423Y",
//     "R1321R",
//     "R1333R",
//     "R4421R",
//     "R4433R",
//     "Y3112Y",
//     "Y3133Y",
//     "Y4412Y",
//     "Y4433Y",
//     "R1311B",
//     "R1355R",
//     "R4411B",
//     "R4455R",
//     "Y3155Y",
//     "Y4455Y",
//     "Y31500",
//     "Y44500",
//     "R1361R",
//     "R4461R",
//     "Y3116Y",
//     "Y3126S",
//     "Y4416Y",
//     "Y4426S",
//     "R1346P",
//     "R4446P",
//     "Y3146P",
//     "Y4446P",
//     "R1311B",
//     "R4411B",
//     "Y31300",
//     "Y44300",
//     "Y3152B",
//     "Y4452B",
//     "Y31400",
//     "Y44400",
//     "B3553B",
//     "R5335R",
//     "B3536B",
//     "B3515Y",
//     "R5363R",
//     "B35300",
//     "R5311Y",
//     "R53100",
//     "R53200",
//     "B3566R",
//     "B3566R",
//     "B3542B",
//     "R5354Y",
//     "R5324R",
//     "B3514Y",
//     "B3534Y",
//     "B3556Y",
//     "B3523Y",
//     "R5322Y",
//     "B3512Y",
//     "B3533Y",
//     "B3555Y",
//     "R5311Y",
//     "B35500",
//     "B3516Y",
//     "B3526S",
//     "B3546P",
//     "B35300",
//     "R5311Y",
//     "B3552B",
//     "R5325R",
//     "B35400",
//     "B6336B",
//     "B6315Y",
//     "Y5136B",
//     "Y5115Y",
//     "R3663R",
//     "R1551R",
//     "B63300",
//     "Y51300",
//     "R3611Y",
//     "R1511B",
//     "R36100",
//     "R15100",
//     "R36200",
//     "R15200",
//     "B6366R",
//     "B6366R",
//     "Y5166R",
//     "Y5166R",
//     "B6342B",
//     "Y5142B",
//     "R3654Y",
//     "R3624R",
//     "R1545B",
//     "B6314Y",
//     "B6334Y",
//     "Y5114Y",
//     "Y5134Y",
//     "R1543R",
//     "R1541R",
//     "B6356Y",
//     "Y5156Y",
//     "R1565R",
//     "B6323Y",
//     "Y5123Y",
//     "R3622Y",
//     "R1522B",
//     "R1532R",
//     "B6312Y",
//     "B6333Y",
//     "Y5112Y",
//     "Y5133Y",
//     "R1521R",
//     "R1533R",
//     "B6355Y",
//     "Y5155Y",
//     "R3611Y",
//     "R1511B",
//     "R1555R",
//     "B63500",
//     "Y51500",
//     "B6316Y",
//     "B6326S",
//     "Y5116Y",
//     "Y5126S",
//     "R1561R",
//     "B6346P",
//     "Y5146P",
//     "R1546P",
//     "B63300",
//     "Y51300",
//     "R3611Y",
//     "R1511B",
//     "B6352B",
//     "Y5152B",
//     "R3625R",
//     "B63400",
//     "Y51400",
//     "Y1111Y",
//     "B1111B",
//     "Y11100",
//     "B11100",
//     "Y11200",
//     "B11200",
//     "Y1154Y",
//     "Y1124R",
//     "B1145B",
//     "B1143R",
//     "B1141R",
//     "B1165R",
//     "Y1122Y",
//     "B1122B",
//     "B1132R",
//     "B1121R",
//     "B1133R",
//     "Y1111Y",
//     "B1111B",
//     "B1155R",
//     "B1161R",
//     "B1146P",
//     "Y1111Y",
//     "B1111B",
//     "Y1125R",
//     "R6666R",
//     "R6666R",
//     "R6666R",
//     "R6666R",
//     "R6642B",
//     "R6642B",
//     "R6614Y",
//     "R6634Y",
//     "R6614Y",
//     "R6634Y",
//     "R6656Y",
//     "R6656Y",
//     "R6623Y",
//     "R6623Y",
//     "R6612Y",
//     "R6633Y",
//     "R6612Y",
//     "R6633Y",
//     "R6655Y",
//     "R6655Y",
//     "R66500",
//     "R66500",
//     "R6616Y",
//     "R6626S",
//     "R6616Y",
//     "R6626S",
//     "R6646P",
//     "R6646P",
//     "R66300",
//     "R66300",
//     "R6652B",
//     "R6652B",
//     "R66400",
//     "R66400",
//     "B5445B",
//     "R4254Y",
//     "R4224R",
//     "Y4554Y",
//     "Y4524R",
//     "B2442B",
//     "B5443R",
//     "B5441R",
//     "B2414Y",
//     "B2434Y",
//     "B5465R",
//     "B2456Y",
//     "B5422B",
//     "B5432R",
//     "R4222Y",
//     "Y4522Y",
//     "B2423Y",
//     "B5421R",
//     "B5433R",
//     "B2412Y",
//     "B2433Y",
//     "B5411B",
//     "B5455R",
//     "R4211Y",
//     "Y4511Y",
//     "B2455Y",
//     "B24500",
//     "B5461R",
//     "B2416Y",
//     "B2426S",
//     "B5446P",
//     "B2446P",
//     "B5411B",
//     "R4211Y",
//     "Y4511Y",
//     "B24300",
//     "R4225R",
//     "Y4525R",
//     "B2452B",
//     "B24400",
//     "R1443R",
//     "R1441R",
//     "Y4314Y",
//     "Y4334Y",
//     "Y4114Y",
//     "Y4134Y",
//     "R3443R",
//     "R3441R",
//     "R1465R",
//     "Y4356Y",
//     "Y4156Y",
//     "R3465R",
//     "R1422B",
//     "R1432R",
//     "Y4323Y",
//     "Y4123Y",
//     "R3422B",
//     "R3432R",
//     "R1421R",
//     "R1433R",
//     "Y4312Y",
//     "Y4333Y",
//     "Y4112Y",
//     "Y4133Y",
//     "R3421R",
//     "R3433R",
//     "R1411B",
//     "R1455R",
//     "Y4355Y",
//     "Y4155Y",
//     "R3411B",
//     "R3455R",
//     "Y43500",
//     "Y41500",
//     "R1461R",
//     "Y4316Y",
//     "Y4326S",
//     "Y4116Y",
//     "Y4126S",
//     "R3461R",
//     "R1446P",
//     "Y4346P",
//     "Y4146P",
//     "R3446P",
//     "R1411B",
//     "Y43300",
//     "Y41300",
//     "R3411B",
//     "Y4352B",
//     "Y4152B",
//     "Y43400",
//     "Y41400",
//     "R5665R",
//     "Y6556Y",
//     "R5622B",
//     "R5632R",
//     "Y6523Y",
//     "R5621R",
//     "R5633R",
//     "Y6512Y",
//     "Y6533Y",
//     "R5611B",
//     "R5655R",
//     "Y6555Y",
//     "Y65500",
//     "R5661R",
//     "Y6516Y",
//     "Y6526S",
//     "R5646P",
//     "Y6546P",
//     "R5611B",
//     "Y65300",
//     "Y6552B",
//     "Y65400",
//     "B2222B",
//     "B2232R",
//     "R2322B",
//     "R2332R",
//     "Y2222Y",
//     "Y3223Y",
//     "B2221R",
//     "B2233R",
//     "R2321R",
//     "R2333R",
//     "Y3212Y",
//     "Y3233Y",
//     "B2211B",
//     "B2255R",
//     "R2311B",
//     "R2355R",
//     "Y2211Y",
//     "Y3255Y",
//     "Y32500",
//     "B2261R",
//     "R2361R",
//     "Y3216Y",
//     "Y3226S",
//     "B2246P",
//     "R2346P",
//     "Y3246P",
//     "B2211B",
//     "R2311B",
//     "Y2211Y",
//     "Y32300",
//     "Y2225R",
//     "Y3252B",
//     "Y32400",
//     "R1221R",
//     "R1233R",
//     "R3321R",
//     "R3333R",
//     "Y2112Y",
//     "Y2133Y",
//     "Y3312Y",
//     "Y3333Y",
//     "R1211B",
//     "R1255R",
//     "R3311B",
//     "R3355R",
//     "Y2155Y",
//     "Y3355Y",
//     "Y21500",
//     "Y33500",
//     "R1261R",
//     "R3361R",
//     "Y2116Y",
//     "Y2126S",
//     "Y3316Y",
//     "Y3326S",
//     "R1246P",
//     "R3346P",
//     "Y2146P",
//     "Y3346P",
//     "R1211B",
//     "R3311B",
//     "Y21300",
//     "Y33300",
//     "Y2152B",
//     "Y3352B",
//     "Y21400",
//     "Y33400",
//     "Y1111Y",
//     "Y5555Y",
//     "B1111B",
//     "B1155R",
//     "R5511B",
//     "R5555R",
//     "Y55500",
//     "Y5516Y",
//     "Y5526S",
//     "B1161R",
//     "R5561R",
//     "Y5546P",
//     "B1146P",
//     "R5546P",
//     "Y1111Y",
//     "Y55300",
//     "B1111B",
//     "R5511B",
//     "Y1125R",
//     "Y5552B",
//     "Y55400",
//     "R1661R",
//     "R2662R",
//     "Y6116Y",
//     "Y6126S",
//     "S6216Y",
//     "S6226S",
//     "R1646P",
//     "Y6146P",
//     "S6246P",
//     "R1611B",
//     "Y61300",
//     "S62300",
//     "Y6152B",
//     "S6252B",
//     "Y61400",
//     "S62400",
//     "P6446P",
//     "P6446P",
//     "R4664R",
//     "R4664Y",
//     "Y4664R",
//     "Y4664Y",
//     "P64300",
//     "P6411B",
//     "P6452B",
//     "P64400",
//     "B1111B",
//     "Y1111Y",
//     "Y1125R",
//     "B2552B",
//     "R5225R",
//     "B25400"
// ]
const get5from6 = () => code6.map(x => x.replace(/(.....)./, '$1'))
const code5 = code6.map(x => x.replace(/(.....)./, '$1'))
const code6r = code6.map(x => strReverse(x))
const code5r = code6r.map(x => x.replace(/(.....)./, '$1'))

//console.log(code6[0],code5[0],code6r[0],code5r[0])
let res = [];
let resc = [];
const z = code6//.slice(0,10);
//console.log(z);

z.forEach(((c6, i) => {
    const r = []
    let org = code5[i]
    do {
        //const org = code5[i]
        if (org) {
            // r.push(org)
            r.push(i)
            code5[i] = ''
        }
        const rev = code5r[i]
        if (rev) {
            // r.push(rev)
            code5r[i] = ''
        }
        i = code5.indexOf(rev)
    } while (i != -1 && code5[i] !== '')
    res.push(r)
    resc.push(r.map(x=>code6[x]))
}));
// console.log(res);
res = res.filter(x => x.length)
// console.log(ls)
let known = {
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
res
    .forEach(x => x
        .forEach((y, i) => {
            ls[lsindextokey[y]].desc = (i != 0 ? 'Same as ' + lsindextokey[x[0]] + ', ' : '') + cc[x[0]]
            if (i != 0) {
                ls[lsindextokey[y]].craft = 'Unknown duplicate'
            }
            if (known[cc[x[0]]]) {
                ls[lsindextokey[y]].craft = known[cc[x[0]]]
            }
            // console.log(ls[y].desc = c[x[0]])
        }))
//console.log(code5.slice(0,10));
// console.log('code5',code5.filter(x => !!x));
// console.log('code5r',code5r.filter(x => !!x));
// console.log(ls)
// console.log(b)
//     console.log('a', a.length)
//     console.log('b', b.length)
//     console.log('failed', failed.length)
//     console.log('res', res.length)
//     console.log('ls', Object.keys(ls).length)
// console.log(Object.keys(ls).length)
function csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(";");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(";");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}
const red = fs.readFileSync('../public/javascripts/stonesaga-crafting-red.csv', 'utf8')
const blue = fs.readFileSync('../public/javascripts/stonesaga-crafting-blue.csv', 'utf8')
const purple = fs.readFileSync('../public/javascripts/stonesaga-crafting-purple.csv', 'utf8')
const yellow = fs.readFileSync('../public/javascripts/stonesaga-crafting-yellow.csv', 'utf8')
const redJSONstr = csvJSON(red);
const blueJSONstr = csvJSON(blue);
const purpleJSONstr = csvJSON(purple);
const yellowJSONstr = csvJSON(yellow);
const redObj = JSON.parse(redJSONstr);
const blueObj = JSON.parse(blueJSONstr);
const purpleObj = JSON.parse(purpleJSONstr);
const yellowObj = JSON.parse(yellowJSONstr);
// console.log(yellowObj);
let items = {red:{},blue:{},purple:{},yellow:{}}
redObj.forEach(x => items.red[x.Code] = x);
blueObj.forEach(x => items.blue[x.Code] = x);
purpleObj.forEach(x => items.purple[x.Code] = x);
yellowObj.forEach(x => items.yellow[x.Code] = x);
// console.log(items);
fs.writeFileSync('red.json', csvJSON(red), 'utf8')
fs.writeFileSync('blue.json', csvJSON(blue), 'utf8')
fs.writeFileSync('purple.json', csvJSON(purple), 'utf8')
fs.writeFileSync('yellow.json', csvJSON(yellow), 'utf8')
fs.writeFileSync('items.json', JSON.stringify(items,null,2), 'utf8')

fs.writeFileSync('b.txt', JSON.stringify(b, null, 2), 'utf8')
fs.writeFileSync('c.txt', JSON.stringify(c, null, 2), 'utf8')
fs.writeFileSync('c5.txt', JSON.stringify(get5from6().filter(onlyUnique).sort(), null, 2), 'utf8')
fs.writeFileSync('failed.txt', JSON.stringify(failed, null, 2), 'utf8')
fs.writeFileSync('ls.txt', JSON.stringify(ls, null, 2), 'utf8')
fs.writeFileSync('res.txt', JSON.stringify(res, null, 2), 'utf8')
fs.writeFileSync('resc.txt', JSON.stringify(resc, null, 2), 'utf8')



