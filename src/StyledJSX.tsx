import type { FC } from 'react'

// 根据官方文档，需要配置tsconfig.json文件
// "jsx": "preserve"
const StyledJSX: FC = () => {
  return (
    <div>
      <p>only this paragraph will get the style :)</p>

      {/* you can include <Component />s here that include
         other <p>s that don't get unexpected styles! */}

      <style jsx>
        {`
      p {
        color: red;
      }
    `}
      </style>
    </div>
  )
}

export default StyledJSX
