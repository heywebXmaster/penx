import React from 'react'
import { Box } from '@fower/react'
import { useRouter } from 'next/router'
import { Button, Spinner, toast } from 'uikit'
import { api, trpc } from '@penx/trpc-client'

export default function CliLogin() {
  const { query, push } = useRouter()
  const token = (query?.token as string) || ''

  const { isLoading: isCanceling, mutateAsync: cancel } =
    trpc.cli.cancelLogin.useMutation()

  return (
    <Box p10 h-100vh toCenter column bgWhite black gap4>
      <Box text3XL fontBold>
        Login to PenX CLI
      </Box>
      <Box gray500>Please confirm your authorization for this login.</Box>

      <Box toCenterY gap2 mt6>
        <Button
          variant="outline"
          colorScheme="white"
          w-160
          gap2
          disabled={isCanceling}
          onClick={async () => {
            if (isCanceling) return
            try {
              await cancel({ token })
              window.close()
            } catch (error) {
              toast.error('please try again')
            }
          }}
        >
          {isCanceling && <Spinner square5></Spinner>}
          <Box>Cancel</Box>
        </Button>
        <Button
          w-160
          onClick={async () => {
            try {
              await api.cli.confirmLogin.mutate({ token })
            } catch (error) {
              toast.error('please try again~')
            }
          }}
        >
          Authorize CLI login
        </Button>
      </Box>
    </Box>
  )
}
