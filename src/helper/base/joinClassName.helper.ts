/**
 * Optimized helper untuk join CSS classes dengan TypeScript
 * @param  {...any} args - Daftar string, objek kondisi, atau array nested
 * @returns {string} - Gabungan kelas CSS
 */

type ClassValue =
   | string
   | null
   | undefined
   | boolean
   | ClassObject
   | ClassValue[]
type ClassObject = { [key: string]: boolean }

const joinClassNameHelper = (...args: ClassValue[]) => {
   const result: string[] = []

   for (const arg of args) {
      if (!arg) continue // Skip falsy values (null, undefined, false, '')

      if (typeof arg === 'string') {
         result.push(arg)
      } else if (Array.isArray(arg)) {
         result.push(joinClassNameHelper(...arg)) // Rekursif untuk array nested
      } else if (typeof arg === 'object') {
         for (const key in arg) {
            if (arg[key]) result.push(key) // Ambil key jika condition-nya truthy
         }
      }
   }

   return result.join(' ')
}

// Example to use
const base: string = 'btn'
const isPrimary: boolean = true
const isDisabled: boolean = false

const classes = joinClassNameHelper(
   base,
   isPrimary && 'btn-primary',
   isDisabled && 'btn-disabled',
   { 'btn-lg': true, 'btn-sm': false },
   ['extra-class', ['nested-class', { 'deep-nested': true }]],
)

// console.log(classes)
// Output: "btn btn-primary btn-lg extra-class nested-class deep-nested"

export default joinClassNameHelper
