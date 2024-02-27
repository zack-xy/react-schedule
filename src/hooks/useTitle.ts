import { useEffect } from 'react'

// hook的规则
// 1.use开头
// 2.只能在组件或者其他hook中调用
// 3.保证每一次执行顺序一致，不能写在if和for中

function useTitle(title: string) {
  useEffect(() => {
    document.title = title
  })
}

export default useTitle
