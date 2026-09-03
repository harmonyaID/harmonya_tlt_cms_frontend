export const MAX_MENU_DEPTH = 3 // parent(0) -> child(1) -> child(2)

export const generateMenuId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

// Cari node by id (recursive)
export const findNodeById = (items, id, key = 'children') => {
    for (const item of items) {
        if (item.id === id) return item
        if (item[key]?.length) {
            const found = findNodeById(item[key], id, key)
            if (found) return found
        }
    }
    return null
}

// Cari siblings array + index dari sebuah id
export const findSiblingsById = (items, id, key = 'children') => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) return { siblings: items, index: i }
        if (items[i][key]?.length) {
            const found = findSiblingsById(items[i][key], id, key)
            if (found) return found
        }
    }
    return null
}

// Hitung depth sebuah node (0 = root)
export const getDepthById = (items, id, key = 'children', depth = 0) => {
    for (const item of items) {
        if (item.id === id) return depth
        if (item[key]?.length) {
            const found = getDepthById(item[key], id, key, depth + 1)
            if (found !== null) return found
        }
    }
    return null
}

// Jumlah sibling di level tertentu (root kalau parentId null)
export const getSiblingsLength = (items, parentId) => {
    if (!parentId) return items.length
    const parentNode = findNodeById(items, parentId)
    return parentNode?.children?.length || 0
}

// ADD / EDIT / REORDER jadi satu fungsi (posisi ditentukan dari menuOrder)
export const upsertMenuItem = (items, parentId, itemData) => {
    const newItems = JSON.parse(JSON.stringify(items))
    const isEditing = Boolean(itemData.id)

    let nodeToInsert = { ...itemData }

    if (isEditing) {
        // keluarkan dulu dari posisi lama (bisa jadi levelnya sama)
        const found = findSiblingsById(newItems, itemData.id)
        if (found) {
            const [removed] = found.siblings.splice(found.index, 1)
            nodeToInsert = { ...removed, ...itemData }
        }
    } else {
        nodeToInsert.id = generateMenuId()
        nodeToInsert.children = nodeToInsert.children || []
    }

    nodeToInsert.menuParent = parentId || ''

    // tentukan target siblings (root atau children milik parentId)
    let targetSiblings
    if (!parentId) {
        targetSiblings = newItems
    } else {
        const parentNode = findNodeById(newItems, parentId)
        if (!parentNode) return newItems
        if (!parentNode.children) parentNode.children = []
        targetSiblings = parentNode.children
    }

    let targetIndex = Number(nodeToInsert.menuOrder) - 1
    if (isNaN(targetIndex) || targetIndex < 0) targetIndex = 0
    if (targetIndex > targetSiblings.length) targetIndex = targetSiblings.length

    targetSiblings.splice(targetIndex, 0, nodeToInsert)

    // reset ulang menuOrder semua sibling di level itu
    targetSiblings.forEach((item, idx) => {
        item.menuOrder = idx + 1
    })

    return newItems
}

// REMOVE + reindex sibling yang tersisa
export const removeMenuItem = (items, id) => {
    const newItems = JSON.parse(JSON.stringify(items))
    const found = findSiblingsById(newItems, id)
    if (!found) return newItems

    found.siblings.splice(found.index, 1)
    found.siblings.forEach((item, idx) => {
        item.menuOrder = idx + 1
    })
    return newItems
}
