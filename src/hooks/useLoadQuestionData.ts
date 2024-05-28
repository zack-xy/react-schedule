import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(async (id: string) => {
    if (!id)
      throw new Error('没有问卷id')
    const data = await getQuestionService(id)
    return data
  }, {
    manual: true,
  })

  useEffect(() => {
    run(id)
  }, [id])

  useEffect(() => {
    if (!data)
      return
    const { componentList = [] } = data

    // 获取默认的selectedId
    let selectedId = ''
    if (componentList.length > 0)
      selectedId = componentList[0].fe_id

    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
  }, [data])

  return { loading, error }
}

export default useLoadQuestionData
