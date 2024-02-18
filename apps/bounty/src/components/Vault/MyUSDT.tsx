import React from 'react'
import { Box } from '@fower/react'
import { useAccount, useReadContract } from 'wagmi'
import { erc20Abi } from '@penx/abi'
import { precision } from '@penx/math'
import { addressMap } from '@penx/wagmi'

const MyUSDT = () => {
  const { address } = useAccount()
  const { data, isLoading } = useReadContract({
    address: addressMap.USDT,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address!],
  })

  if (isLoading) return null

  return (
    <Box toCenterY>
      <Box>Owner: </Box>
      <Box>
        {!!data && precision.toTokenDecimal(data)}
        USDT
      </Box>
    </Box>
  )
}

export default MyUSDT
