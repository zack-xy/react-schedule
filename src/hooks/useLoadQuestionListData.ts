import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

function useLoadQuestionListData() {
  const [searchParams] = useSearchParams()
  // eslint-disable-next-line no-console
  console.log('keyword', searchParams.get('keyword'))
  const { data, loading, error } = useRequest(async () => {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

    const data = await getQuestionListService({ keyword })
    return data
  }, { refreshDeps: [searchParams] })

  return { data, loading, error }
}

export default useLoadQuestionListData
