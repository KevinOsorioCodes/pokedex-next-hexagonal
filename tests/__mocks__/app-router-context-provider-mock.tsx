import React, { useMemo } from 'react'
import {
  AppRouterInstance,
  AppRouterContext,
} from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>
  children: React.ReactNode
}

export const AppRouterContextProviderMock = ({
  router,
  children,
}: AppRouterContextProviderMockProps): React.ReactNode => {
  const mockedRouter: AppRouterInstance = useMemo(
    () => ({
      back: jest.fn(),
      forward: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
      ...router,
    }),
    [router]
  )
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  )
}
