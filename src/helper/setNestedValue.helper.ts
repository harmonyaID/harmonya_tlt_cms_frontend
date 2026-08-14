/**
 * setNestedValue
 * ------------------------------------------------------------
 * Set value ke object nested berdasarkan `name` field, immutable.
 *
 * Support:
 *   "email"            -> { email }
 *   "address.city"     -> { address: { city } }
 *   "items[0].value"   -> { items: [ { value } ] }
 *
 * Pemakaian di React:
 *
 *   const [values, setValues] = useState({ items: [{ value: "" }] });
 *
 *   <input
 *     name="items[0].value"
 *     value={values.items[0].value}
 *     onChange={(e) =>
 *       setValues((prev) => setNestedValue(prev, e.target.name, e.target.value))
 *     }
 *   />
 * ------------------------------------------------------------
 */
function setNestedValue<T extends Record<string, any>>(
    obj: T,
    name: string,
    value: any,
): T {
    const path = name.match(/[^.[\]]+/g) ?? [] // "items[0].value" -> ["items","0","value"]
    const result: any = structuredClone(obj)
    let current: any = result

    path.forEach((rawKey, i) => {
        const key: string | number = /^\d+$/.test(rawKey)
            ? Number(rawKey)
            : rawKey
        const isLast = i === path.length - 1

        if (isLast) {
            current[key] = value
        } else {
            const nextIsArrayIndex = /^\d+$/.test(path[i + 1])
            if (current[key] == null) current[key] = nextIsArrayIndex ? [] : {}
            current = current[key]
        }
    })

    return result
}

export default setNestedValue
