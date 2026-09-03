import ImgeEmpty from '@/asset/image/icon/image-placeholder.png'

export const imgError = (e) => {
   e.target.onError = null
   e.target.src = ImgeEmpty
}
