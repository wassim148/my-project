enum FILES_TYPE {
    PDF,
    IMAGE,
    UNKOWN
}
function _fileType(type: string) {
    if (type == 'application/pdf')
        return FILES_TYPE.PDF
}
export default {
    ALLOWED_PREVIEW_TYPES: [
        'image/jpeg',
        'image/png'
    ],
    ICONS: (type: string) => {
        switch (_fileType(type)) {
            case FILES_TYPE.PDF:
                return 'ph:file-pdf-duotone'
            default:
                return 'ph:file-text-duotone'
        }

    },
} as const

