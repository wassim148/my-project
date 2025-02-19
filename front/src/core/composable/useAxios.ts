import { useCookies } from 'vue3-cookies'
import { useRouter } from 'vue-router'
import { env } from '@constants'
import { useToast } from '@components/ui/toast'
import { h, inject } from 'vue'
import { AxiosError } from 'axios'

type ErrorMessageFormat = {
    error: string
    message: string | string[]
    status: number
}

export default function useAxios(axios: any) {
    const { cookies } = useCookies()
    const router = useRouter()
    const token = cookies.get(env.TOKEN_KEY.toString())
    const { toast } = useToast()

    axios.interceptors.request.use((request: any) => {
        const token = cookies.get(env.TOKEN_KEY.toString())
        const isApiUrl = request.url.startsWith(env.BACKEND_BASE_URL.toString())
        if (token && isApiUrl) {
            request.headers.Authorization = `Bearer ${token}`
        }

        return request
    })

    axios.interceptors.response.use(
        (res: any) => {
            return res.data
        },
        (error: AxiosError) => {
            const errorMessages = [
                ...(error.response
                    ? typeof (error.response.data as ErrorMessageFormat).message == 'string'
                        ? [(error.response.data as ErrorMessageFormat).message]
                        : (error.response.data as ErrorMessageFormat).message
                    : [error.message]),
            ]
            toast({
                title: 'Uh oh! Something went wrong.',
                description: h('ul', [
                    errorMessages.map((message, index) => h('li', { key: index, class: 'list-disc' }, message)),
                ]),
                variant: 'destructive',
            })
            if (error.response?.status == 401) {
                cookies.remove(env.TOKEN_KEY)
                router.push('/sign-in')
            }
            throw error
        },
    )
    return axios
}

