export const textSlug = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // hapus aksen
        .replace(/[^a-z0-9\s-]/g, '') // hapus karakter selain huruf/angka/spasi/strip
        .replace(/\s+/g, '-') // spasi jadi strip
        .replace(/-+/g, '-')
}
