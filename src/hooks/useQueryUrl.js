import { useNavigate, useSearchParams} from "react-router-dom"
import qs from 'qs'

export const useQueryUrl = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const setQueryParam = (param) => {

        const queryString = qs.stringify(param, {
            addQueryPrefix: true,
        })

        navigate(queryString)

    }

    const queryParams = Object.fromEntries(searchParams)
    // fromEntries(searchParams) => biến mảng về thành object

    return [queryParams, setQueryParam]

}

