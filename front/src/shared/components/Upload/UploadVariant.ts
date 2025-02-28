import { type VariantProps, cva } from 'class-variance-authority'

export const uploadVariant = cva(
    'relative flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
    {
        variants: {
            size: {
                sm: 'h-24 w-full',
                base: 'h-40 w-full',
                lg: 'h-80 w-full',
            },
        },
    },
)

export type UploadVariants = VariantProps<typeof uploadVariant>
