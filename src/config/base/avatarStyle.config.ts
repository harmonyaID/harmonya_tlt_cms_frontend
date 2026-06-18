// Definisikan tipe untuk avatar style
interface HardStyle {
   background: string
   color: string
}

interface AvatarStyle {
   background: string
   color: string
   alphabet: string[]
   hard: HardStyle
}

const _objShape = (
   background: string,
   color: string,
   alphabet: string[],
   hard: HardStyle,
): AvatarStyle => ({
   background,
   color,
   alphabet,
   hard,
})

const _objShapeHard = (background: string, color: string): HardStyle => ({
   background,
   color,
})

const avatar_1 = _objShape(
   'C5CEF8',
   '18255C',
   ['a', 'm', 'y'],
   _objShapeHard('002DFF', 'FFFFFF'),
)
const avatar_2 = _objShape(
   'F9E695',
   '997C00',
   ['b', 'n', 'z'],
   _objShapeHard('FFCF00', '171717'),
)
const avatar_3 = _objShape(
   'F0F0F5',
   '26273B',
   ['c', 'o'],
   _objShapeHard('00008A', 'FFFFFF'),
)
const avatar_4 = _objShape(
   'FACDD3',
   'A73442',
   ['d', 'p'],
   _objShapeHard('F7001E', 'FFFFFF'),
)
const avatar_5 = _objShape(
   'C0F4E1',
   '208E66',
   ['e', 'q'],
   _objShapeHard('05C17D', 'F7FFFC'),
)
const avatar_6 = _objShape(
   'DCE8FA',
   '3461A5',
   ['f', 'r'],
   _objShapeHard('004CBD', 'FFFFFF'),
)
const avatar_7 = _objShape(
   'FEF0D2',
   'F78822',
   ['g', 's'],
   _objShapeHard('ED7100', 'FFFFFF'),
)
const avatar_8 = _objShape(
   'FED2F7',
   'D4189C',
   ['h', 't'],
   _objShapeHard('DC049C', 'FFFFFF'),
)
const avatar_9 = _objShape(
   '99ECFE',
   '005466',
   ['i', 'u'],
   _objShapeHard('00C7F3', 'EEFCFF'),
)
const avatar_10 = _objShape(
   'FED2F7',
   '5D0A8F',
   ['j', 'v'],
   _objShapeHard('7B11BB', 'FCF6FF'),
)
const avatar_11 = _objShape(
   'FEFCD3',
   '776707',
   ['k', 'w'],
   _objShapeHard('646245', 'ffffff'),
)
const avatar_12 = _objShape(
   'FED2DB',
   '760676',
   ['l', 'x'],
   _objShapeHard('00CBB3', 'F4FFFE'),
)

export const listAvatarStyle: AvatarStyle[] = [
   avatar_1,
   avatar_2,
   avatar_3,
   avatar_4,
   avatar_5,
   avatar_6,
   avatar_7,
   avatar_8,
   avatar_9,
   avatar_10,
   avatar_11,
   avatar_12,
]
