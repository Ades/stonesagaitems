// Shared material data and combination logic for the generator scripts
// (stonesaga_localStorage_index.js and stonesaga_create_combos.js).

// Each side of a material card is a colour letter + a value ("B2"), a blank
// connector ("0"), or nothing at all ("-"). Sides are listed west, north, east, south.
function material(item, type, note, {tool = '', process = [], sides = '- - - -'} = {}) {
    const [w, n, e, s] = sides.split(' ').map(side => (side === '-' ? '' : side))
    const present = [w, n, e, s].filter(Boolean)
    const m = {
        item,
        type,
        note,
        tool,
        process_1: process[0] || '',
        process_2: process[1] || '',
        w, n, e, s,
        cols: present.map(side => side[0]),
        vals: present.map(side => side[1] || side[0]),
    }
    // One code per orientation (see ROTATIONS): the two opposite sides read left to right.
    m.codes = [w + e, n + s, e + w, s + n].map(code => code.replaceAll('0', '00'))
    return m
}

const MATERIALS = [
    material('bone', 'animal', 'animal__Bone__0', {process: ['drill', 'cut'], sides: 'B2 Y3 Y2 R2'}),
    material('bone, carved', 'animal', 'animal__Bone__1', {tool: 'drill', sides: 'R1 R4 Y3 Y4'}),
    material('hide', 'animal', 'animal__Hide__0', {process: ['drill', 'cut']}),
    material('hide, cured', 'animal', 'animal__Hide__1', {sides: 'B3 - R5 -'}),
    material('shell', 'animal', 'animal__Shell__0', {process: ['drill', 'grind']}),
    material('shell, sharpened', 'animal', 'animal__Shell__1', {tool: 'cut', sides: 'B6 Y5 R3 R1'}),
    material('guts', 'animal', 'animal__Guts__0', {process: ['heat', 'cut']}),
    material('guts, cured', 'animal', 'animal__Guts__1', {sides: 'Y1 0 B1 R3'}),
    material('feather', 'animal', 'animal__Feather__0', {process: ['cut'], sides: '0 - B1 -'}),
    material('feather, cut', 'animal', 'animal__Feather__1', {sides: 'Y1 - 0 -'}),
    material('tooth', 'animal', 'animal__Tooth__0', {tool: 'drill', process: ['drill']}),
    material('tooth, drilled', 'animal', 'animal__Tooth__1', {tool: 'drill', sides: 'B2 Y2 0 0'}),

    material('clay', 'mineral', 'mineral__Clay__0', {process: ['heat']}),
    material('clay, fired', 'mineral', 'mineral__Clay__1', {sides: 'R6 - R6 -'}),
    material('cloudstone', 'mineral', 'mineral__Cloudstone__0', {process: ['grind']}),
    material('cloudstone, shaped', 'mineral', 'mineral__Cloudstone__1', {tool: 'strike', sides: 'B5 R4 Y4 B2'}),
    material('riverstone', 'mineral', 'mineral__Riverstone__0', {process: ['strike']}),
    material('riverstone, flaked', 'mineral', 'mineral__Riverstone__1', {tool: 'cut', sides: 'R1 Y4 Y4 R3'}),
    material('sunstone', 'mineral', 'mineral__Sunstone__0', {tool: 'grind', process: ['grind']}),
    material('sunstone, shaped', 'mineral', 'mineral__Sunstone__1', {tool: 'grind', sides: 'R5 - Y6 -'}),

    material('wood', 'plant', 'plant__Wood__0', {process: ['heat', 'cut'], sides: 'B2 R2 Y2 Y3'}),
    material('wood, hardened', 'plant', 'plant__Wood__1', {tool: 'drill', sides: 'R1 R3 Y2 Y3'}),
    material('fiber', 'plant', 'plant__Fiber__0', {process: ['cut']}),
    material('fiber, woven', 'plant', 'plant__Fiber__1', {sides: 'Y1 Y5 B1 R5'}),
    material('pitch', 'plant', 'plant__Pitch__0', {process: ['heat']}),
    material('pitch, treated', 'plant', 'plant__Pitch__1', {sides: 'R5 - 0 -'}),

    material('moonblood', 'rare', 'rare__Moonblood__0', {process: ['moon']}),
    material('moonblood, solid', 'rare', 'rare__Moonblood__1', {sides: 'R1 R2 Y6 S6'}),
    material('coral, dead', 'rare', 'rare__Coral__0', {process: ['comet']}),
    material('coral, living', 'rare', 'rare__Coral__1', {sides: 'P6 P6 R4 Y4'}),
    material('silk', 'rare', 'rare__Silk__0', {process: ['energy'], sides: 'B1 R3 Y1 0'}),
    material('silk, woven', 'rare', 'rare__Silk__1', {sides: 'B2 - R5 -'}),

    material('pigment', 'item', '', {sides: 'R4 - 0 -'}),
]

// Card rotation in degrees for each entry of material.codes.
const ROTATIONS = [0, 270, 180, 90]

const reverse = str => str.split('').reverse().join('')
const code5 = code6 => code6.substring(0, 5)
const code5Reversed = code6 => code5(reverse(code6))

// Tries every material, in every orientation, against every other one.
// Two cards combine when the touching sides have the same (non-blank) colour.
// The resulting code is: colour + both values of the first card, both values
// of the second card, and the outer colour of the second card.
function buildCombos(materials = MATERIALS) {
    const valid = []
    const failed = []
    for (const first of materials) {
        for (const second of materials) {
            first.codes.forEach((left, k) => {
                second.codes.forEach((right, l) => {
                    const [startCol = '', startVal = '', leftConn = '', leftEndVal = ''] = left
                    const [rightConn = '', rightStartVal = '', endCol = '', endVal = ''] = right
                    const combo = {
                        code6: startCol + startVal + leftEndVal + rightStartVal + endVal + endCol,
                        connection: leftConn + rightConn,
                        sides: left + right + endCol,
                        label: `${first.item}(${k}) + ${second.item}(${l})`,
                        key: `${first.note}:${ROTATIONS[k]}|${second.note}:${ROTATIONS[l]}`,
                    }
                    const connects = leftConn === rightConn && leftConn !== '' && leftConn !== '0'
                    if (connects && startCol !== '0') {
                        valid.push(combo)
                    } else {
                        failed.push(combo)
                    }
                })
            })
        }
    }
    return {valid, failed}
}

// Groups the indexes of combos that are the same recipe: reading a combination
// from the other end gives the reversed code, so a code and its reverse are
// chained together. Every index ends up in exactly one group.
function groupDuplicates(code6List) {
    const forward = code6List.map(code5)
    const backward = code6List.map(code5Reversed)
    const groups = []
    code6List.forEach((_, start) => {
        const group = []
        let i = start
        while (i !== -1 && forward[i] !== '') {
            group.push(i)
            const reversed = backward[i]
            forward[i] = ''
            backward[i] = ''
            i = forward.indexOf(reversed)
        }
        if (group.length) groups.push(group)
    })
    return groups
}

// The localStorage content (key → {craft, desc}) used by the app, with every
// combination marked Unknown. `known` optionally maps a code5 to a craft name.
function buildLocalStorage(valid, groups, known = {}) {
    const ls = {}
    valid.forEach(combo => {
        ls[combo.key] = {craft: '<b style=background-color:red>Unknown</b>', desc: 'Unknown'}
    })
    groups.forEach(group => {
        const first = valid[group[0]]
        const code = code5(first.code6)
        group.forEach((index, position) => {
            const entry = ls[valid[index].key]
            entry.desc = (position !== 0 ? `Same as ${first.key}, ` : '') + code
            if (position !== 0) entry.craft = 'Unknown duplicate'
            if (known[code]) entry.craft = known[code]
        })
    })
    return ls
}

module.exports = {
    MATERIALS,
    ROTATIONS,
    buildCombos,
    buildLocalStorage,
    code5,
    code5Reversed,
    groupDuplicates,
}
