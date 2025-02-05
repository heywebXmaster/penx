import React from 'react'
import { Box } from '@fower/react'
import { useSession } from 'next-auth/react'
import { SessionProvider } from '@penx/session'
import { RecoveryPhrase } from '~/components/RecoveryPhrase/RecoveryPhrase'

const PagePassword = () => {
  const session = useSession()

  return (
    <SessionProvider
      value={{
        data: session.data as any,
        loading: session.status === 'loading',
      }}
    >
      <Box h-100vh toCenter>
        <RecoveryPhrase></RecoveryPhrase>
      </Box>
    </SessionProvider>
  )
}

export default PagePassword
