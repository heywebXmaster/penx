import { ReactNode } from 'react'
import { Box } from '@fower/react'

interface SidebarItemProps {
  label: ReactNode
  icon: ReactNode
  onClick: () => void
}

export const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
  return (
    <Box
      toCenterY
      toBetween
      gap2
      rounded2XL
      px2
      py-14
      cursorPointer
      gray600
      black--hover
      h-24
      onClick={onClick}
    >
      <Box toCenterY gap2>
        <Box inlineFlex>{icon}</Box>
        <Box textSM>{label}</Box>
      </Box>
    </Box>
  )
}
