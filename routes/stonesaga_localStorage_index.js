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
let a = [
    {
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
const code5 = code6.map(x => x.replace(/(.....)./, '$1'))
const code6r = code6.map(x => strReverse(x))
const code5r = code6r.map(x => x.replace(/(.....)./, '$1'))

//console.log(code6[0],code5[0],code6r[0],code5r[0])
let res = [];
let resc = [];
const z = code6//.slice(0,10);

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
res = res.filter(x => x.length)
resa = {}
res
    .forEach(x => x
        .forEach((y, i) => {
            ls[lsindextokey[y]].desc = (i != 0 ? 'Same as ' + lsindextokey[x[0]] + ', ' : '') + cc[x[0]]
            if (i != 0) {
                ls[lsindextokey[y]].craft = 'Unknown duplicate'
            }
            resa[lsindextokey[y]] = x
        }))


fs.writeFileSync('_ls.txt', JSON.stringify(ls, null, 2), 'utf8')
fs.writeFileSync('_res.txt', JSON.stringify(res, null, 2), 'utf8')
fs.writeFileSync('_lsi.txt', JSON.stringify(lsindextokey, null, 2), 'utf8')
fs.writeFileSync('_resa.txt', JSON.stringify(resa, null, 2), 'utf8')
fs.writeFileSync('../public/javascripts/_lsi.json', JSON.stringify(lsindextokey, null, 2), 'utf8')
fs.writeFileSync('../public/javascripts/_resa.json', JSON.stringify(resa, null, 2), 'utf8')



