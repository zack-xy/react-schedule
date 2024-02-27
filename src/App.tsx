import React from 'react'
import './App.css'

// 自定义hook
// import useTitle from './hooks/useTitle'
// import useMouse from './hooks/useMouse'
// import useGetInfo from './hooks/useGetInfo'

// import StateDemo1 from './StateDemo1'
// import StateDemo2 from './StateDemo2'
// import Demo from './immerDemo'
// import UseRefDemo from './useRefDemo'
// import UseMemoDemo from './useMemoDemo'
// import UseCallbackDemo from './UseCallbackDemo'

// import List1 from './List1'
import List2 from './List2'

function App() {
  // useTitle('App page')
  // const { x, y } = useMouse()
  // const { loading, info } = useGetInfo()
  return (
    <div className="App">

      {/* <div>
        {x}
        {y}
      </div> */}

      {/* <div>{loading ? '加载中...' : info}</div> */}

      {/* <StateDemo1></StateDemo1> */}
      {/* <StateDemo2></StateDemo2> */}
      {/* <Demo></Demo> */}
      {/* <UseRefDemo></UseRefDemo> */}
      {/* <UseMemoDemo></UseMemoDemo> */}
      {/* <UseCallbackDemo></UseCallbackDemo> */}

      {/* <List1 title="问卷调查列表"></List1> */}
      <List2></List2>

    </div>
  )
}

export default App
