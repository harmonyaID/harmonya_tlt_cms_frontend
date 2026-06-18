// Audio
import IconAudioMp3 from '@/asset/image/iconFile/audio_of_mp3.svg'
import IconAudioWav from '@/asset/image/iconFile/audio_wav_wav.svg'
// Code or Cod
import IconCodCss from '@/asset/image/iconFile/cod_of_css.svg'
import IconCodDmg from '@/asset/image/iconFile/cod_of_dmg.svg'
import IconCodExe from '@/asset/image/iconFile/cod_of_exe.svg'
import IconCodHtml from '@/asset/image/iconFile/cod_of_html.svg'
import IconCodJava from '@/asset/image/iconFile/cod_of_java.svg'
import IconCodJs from '@/asset/image/iconFile/cod_of_js.svg'
import IconCodJson from '@/asset/image/iconFile/cod_of_json.svg'
import IconCodRar from '@/asset/image/iconFile/cod_of_rar.svg'
import IconCodZip from '@/asset/image/iconFile/cod_of_zip.svg'
// Document or Doc
import IconDocCsv from '@/asset/image/iconFile/doc_of_csv.svg'
import IconDocDoc from '@/asset/image/iconFile/doc_of_doc.svg'
import IconDocDocx from '@/asset/image/iconFile/doc_of_docx.svg'
import IconFolder from '@/asset/image/iconFile/doc_of_folder.svg'
import IconDocPdf from '@/asset/image/iconFile/doc_of_pdf.svg'
import IconDocPpt from '@/asset/image/iconFile/doc_of_ppt.svg'
import IconDocTxt from '@/asset/image/iconFile/doc_of_txt.svg'
import IconDocXls from '@/asset/image/iconFile/doc_of_xls.svg'
import IconDocXlsx from '@/asset/image/iconFile/doc_of_xlsx.svg'
import IconGeneralFile from '@/asset/image/iconFile/general_file.svg'
// Image / Img
import IconImgAvif from '@/asset/image/iconFile/img_of_avif.svg'
import IconImgGif from '@/asset/image/iconFile/img_of_gif.svg'
import IconImgIco from '@/asset/image/iconFile/img_of_ico.svg'
import IconImgJpeg from '@/asset/image/iconFile/img_of_jpeg.svg'
import IconImgJpg from '@/asset/image/iconFile/img_of_jpg.svg'
import IconImgPng from '@/asset/image/iconFile/img_of_png.svg'
import IconImgSvg from '@/asset/image/iconFile/img_of_svg.svg'
import IconImgTiff from '@/asset/image/iconFile/img_of_tiff.svg'
import IconImgWebp from '@/asset/image/iconFile/img_of_webp.svg'
// Video
import IconVideoAvi from '@/asset/image/iconFile/video_of_avi.svg'
import IconVideoMov from '@/asset/image/iconFile/video_of_mov.svg'
import IconVideoMp4 from '@/asset/image/iconFile/video_of_mp4.svg'
import IconVideoMpg from '@/asset/image/iconFile/video_of_mpg.svg'

// ===================================

const objectFormatFile = (format: string, icon: string) => ({ format, icon })

// --------------------------------

// GENERAL
export const FILE_GENERAL = objectFormatFile('', IconGeneralFile)

// File Audio
export const FILE_AUDIO_MP3 = objectFormatFile('mp3', IconAudioMp3)
export const FILE_AUDIO_WAV = objectFormatFile('wav', IconAudioWav)

export const listFormatFileAudio = [FILE_AUDIO_MP3, FILE_AUDIO_WAV]

// File Cod or Code
export const FILE_COD_CSS = objectFormatFile('css', IconCodCss)
export const FILE_COD_DMG = objectFormatFile('dmg', IconCodDmg)
export const FILE_COD_EXE = objectFormatFile('exe', IconCodExe)
export const FILE_COD_HTML = objectFormatFile('html', IconCodHtml)
export const FILE_COD_JAVA = objectFormatFile('java', IconCodJava)
export const FILE_COD_JS = objectFormatFile('js', IconCodJs)
export const FILE_COD_JSON = objectFormatFile('json', IconCodJson)
export const FILE_COD_RAR = objectFormatFile('rar', IconCodRar)
export const FILE_COD_ZIP = objectFormatFile('zip', IconCodZip)

export const listFormatFileCod = [
    FILE_COD_CSS,
    FILE_COD_DMG,
    FILE_COD_EXE,
    FILE_COD_HTML,
    FILE_COD_JAVA,
    FILE_COD_JS,
    FILE_COD_JSON,
    FILE_COD_RAR,
    FILE_COD_ZIP,
]

// File Document
export const FILE_DOC_FOLDER = objectFormatFile('csv', IconFolder)
export const FILE_DOC_CSV = objectFormatFile('csv', IconDocCsv)
export const FILE_DOC_DOC = objectFormatFile('doc', IconDocDoc)
export const FILE_DOC_DOCX = objectFormatFile('docx', IconDocDocx)
export const FILE_DOC_PDF = objectFormatFile('pdf', IconDocPdf)
export const FILE_DOC_PPT = objectFormatFile('ppt', IconDocPpt)
export const FILE_DOC_TXT = objectFormatFile('txt', IconDocTxt)
export const FILE_DOC_XLS = objectFormatFile('xls', IconDocXls)
export const FILE_DOC_XLSX = objectFormatFile('xlsx', IconDocXlsx)

export const listFormatFileDoc = [
    FILE_DOC_FOLDER,
    FILE_DOC_CSV,
    FILE_DOC_DOC,
    FILE_DOC_DOCX,
    FILE_DOC_PDF,
    FILE_DOC_PPT,
    FILE_DOC_TXT,
    FILE_DOC_XLS,
    FILE_DOC_XLSX,
]

// File Image
export const FILE_IMG_AVIF = objectFormatFile('avif', IconImgAvif)
export const FILE_IMG_GIF = objectFormatFile('gif', IconImgGif)
export const FILE_IMG_ICO = objectFormatFile('ico', IconImgIco)
export const FILE_IMG_JPEG = objectFormatFile('jpeg', IconImgJpeg)
export const FILE_IMG_JPG = objectFormatFile('jpg', IconImgJpg)
export const FILE_IMG_PNG = objectFormatFile('png', IconImgPng)
export const FILE_IMG_SVG = objectFormatFile('svg', IconImgSvg)
export const FILE_IMG_TIFF = objectFormatFile('tiff', IconImgTiff)
export const FILE_IMG_WEBP = objectFormatFile('webp', IconImgWebp)

export const listFormatFileImage = [
    FILE_IMG_AVIF,
    FILE_IMG_GIF,
    FILE_IMG_ICO,
    FILE_IMG_JPEG,
    FILE_IMG_JPG,
    FILE_IMG_PNG,
    FILE_IMG_SVG,
    FILE_IMG_TIFF,
    FILE_IMG_WEBP,
]

// File Video
export const FILE_VIDEO_AVI = objectFormatFile('avi', IconVideoAvi)
export const FILE_VIDEO_MOV = objectFormatFile('mov', IconVideoMov)
export const FILE_VIDEO_MP4 = objectFormatFile('mp4', IconVideoMp4)
export const FILE_VIDEO_MPG = objectFormatFile('mpg', IconVideoMpg)

export const listFormatFileVideo = [
    FILE_VIDEO_AVI,
    FILE_VIDEO_MOV,
    FILE_VIDEO_MP4,
    FILE_VIDEO_MPG,
]

// File All
export const listFormatFiles = [
    FILE_GENERAL,
    ...listFormatFileAudio,
    ...listFormatFileCod,
    ...listFormatFileDoc,
    ...listFormatFileImage,
    ...listFormatFileVideo,
]

export const listFormatFileRenderInElementObject = [
    FILE_DOC_PDF,
    FILE_COD_JSON,
    FILE_COD_CSS,
    FILE_COD_JS,
]
