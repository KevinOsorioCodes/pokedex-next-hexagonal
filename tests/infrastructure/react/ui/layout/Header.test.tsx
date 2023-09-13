import PokedexHeader from '~/infrastructure/react/ui/layout/Header'
import { render, screen } from '@testing-library/react'
import { labels } from '~/shared/labels'

describe('PokedexHeader', () => {
  // Tests that the class name of the header element is set correctly
  it('should set the class name of the header element correctly', () => {
    render(<PokedexHeader />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toHaveClass(
      'h-8 w-full bg-red-600 flex justify-center items-center'
    )
  })

  // Tests that the aria-label attribute of the header element is set correctly
  it('should set the aria-label attribute of the header element correctly', () => {
    render(<PokedexHeader />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toHaveAttribute('aria-label', labels.APP_NAME)
  })

  // Tests that the value of labels.APP_NAME is displayed inside the header element
  it('should display the value of labels.APP_NAME inside the header element', () => {
    render(<PokedexHeader />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toHaveTextContent(labels.APP_NAME)
  })
})
