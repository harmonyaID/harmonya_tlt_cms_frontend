/**
 * getEmptyValueLike
 * ------------------------------------------------------------
 * Balikin "versi kosong" dari sebuah value, berdasarkan tipenya.
 * ------------------------------------------------------------
 */
export function getEmptyValueLike(value: any): any {
    if (Array.isArray(value)) return []
    if (typeof value === 'string') return ''
    if (typeof value === 'number') return 0
    if (typeof value === 'boolean') return false
    if (value !== null && typeof value === 'object') return {}
    return null
}

/**
 * resetNestedValue
 * ------------------------------------------------------------
 * Reset value di path tertentu jadi "kosong" (bukan dihapus dari struktur).
 * Cocok buat: clear input, clear object, clear array.
 *
 * Contoh:
 *   resetNestedValue(values, "email")          -> email jadi ""
 *   resetNestedValue(values, "address")        -> address jadi {}
 *   resetNestedValue(values, "items")          -> items jadi []
 *   resetNestedValue(values, "items[0].value") -> items[0].value jadi ""
 *
 * Pemakaian di React:
 *
 *   <button onClick={() =>
 *     setValues((prev) => resetNestedValue(prev, "address"))
 *   }>
 *     Clear Address
 *   </button>
 * ------------------------------------------------------------
 */
export function resetNestedValue<T extends Record<string, any>>(
    obj: T,
    name: string,
): T {
    const path = name.match(/[^.[\]]+/g) ?? []
    if (path.length === 0) return obj

    const result: any = structuredClone(obj)
    let current: any = result

    for (let i = 0; i < path.length - 1; i++) {
        const rawKey = path[i]
        const key: string | number = /^\d+$/.test(rawKey)
            ? Number(rawKey)
            : rawKey

        if (current[key] == null) return result // path gak ada, no-op
        current = current[key]
    }

    const rawLastKey = path[path.length - 1]
    const lastKey: string | number = /^\d+$/.test(rawLastKey)
        ? Number(rawLastKey)
        : rawLastKey

    current[lastKey] = getEmptyValueLike(current[lastKey])

    return result
}

/**
 * setRemoveNestedArray
 * ------------------------------------------------------------
 * Hapus 1 elemen dari array pada path tertentu, berdasarkan index.
 * Elemen lain otomatis geser (splice), array-nya mengecil.
 *
 * Contoh:
 *   setRemoveNestedArray(values, "items", 0)         -> hapus items[0]
 *   setRemoveNestedArray(values, "address.tags", 2)  -> hapus address.tags[2]
 *
 * Pemakaian di React (tombol hapus per baris list):
 *
 *   {values.items.map((item, idx) => (
 *     <div key={idx}>
 *       <input
 *         name={`items[${idx}].value`}
 *         value={item.value}
 *         onChange={(e) =>
 *           setValues((prev) => setNestedValue(prev, e.target.name, e.target.value))
 *         }
 *       />
 *       <button onClick={() =>
 *         setValues((prev) => removeArrayItem(prev, "items", idx))
 *       }>
 *         Hapus
 *       </button>
 *     </div>
 *   ))}
 * ------------------------------------------------------------
 */
export function setRemoveNestedArray<T extends Record<string, any>>(
    obj: T,
    arrayPath: string,
    index: number,
): T {
    const path = arrayPath.match(/[^.[\]]+/g) ?? []
    if (path.length === 0) return obj

    const result: any = structuredClone(obj)
    let current: any = result

    for (const rawKey of path) {
        const key: string | number = /^\d+$/.test(rawKey)
            ? Number(rawKey)
            : rawKey

        if (current[key] == null) return result // path gak ada, no-op
        current = current[key]
    }

    if (Array.isArray(current)) {
        current.splice(index, 1)
    }

    return result
}
