import type { FC } from 'react'
import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button<{ primary?: boolean }>`
  --accent-color: white;

  background: pink;
  border-radius: 3px;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;

  ${props =>
    props.primary && css`
    background: #BF4F74;
    color: white;
  `}
`
const Container = styled.div`
  text-align: center;
`

const StyledComponentDemo: FC = () => {
  return (
    <div>
      <p>styled component demo</p>
      <Container>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </Container>
    </div>
  )
}

export default StyledComponentDemo
