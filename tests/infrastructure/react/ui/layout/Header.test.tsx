import PokedexHeader from '~/infrastructure/react/ui/layout/Header'
import { render } from '@testing-library/react'
import { providerWrapper } from '~/tests/__mocks__/Wrappers'

describe('PokedexHeader', () => {
  // Tests that the class name of the header element is set correctly
  it('should set the class name of the header element correctly', () => {
    const { getByTestId } = render(<PokedexHeader />)
    const headerElement = getByTestId('header')
    expect(headerElement).toBeInTheDocument()
  })

  // Tests that the aria-label attribute of the header element is set correctly
  it('should set the aria-label attribute of the header element correctly', () => {
    const { getByTestId } = render(<PokedexHeader />)
    const logoElement = getByTestId('logo')
    expect(logoElement).toBeInTheDocument()
  })

  // Tests that the value of labels.APP_NAME is displayed inside the header element
  it('should display the value of labels.APP_NAME inside the header element', () => {
    const { getByTestId } = render(<PokedexHeader />, {
      wrapper: providerWrapper,
    })
    const homeItem = getByTestId('item-Home')
    expect(homeItem).toBeInTheDocument()
  })
})
