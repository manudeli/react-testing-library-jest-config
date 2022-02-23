import { render, screen } from '@testing-library/react'
import Hello from './Hello'

it('"Hello World"를 렌더링합니다.', () => {
    render(<Hello/>)
    const myElement = screen.getByText('Hello World')
    expect(myElement).toBeInTheDocument()
})