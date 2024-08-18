import '@testing-library/jest-dom'
import 'jest-localstorage-mock'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/mock-path',
      query: { mockKey: 'mockValue' },
      push: jest.fn(),
      // ...other router properties and methods
    }
  },
}))
