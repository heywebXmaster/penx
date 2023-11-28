import { Box } from '@fower/react'
import { Cloud, KeyRound, Laptop } from 'lucide-react'
import { PopoverClose, Tag } from 'uikit'
import { Space } from '@penx/model'
import { ISpace } from '@penx/model-types'
import { store } from '@penx/store'
import { Bullet } from '../../../components/Bullet'

interface Props {
  item: ISpace
  activeSpace: Space
}

export function SpaceItem({ item, activeSpace }: Props) {
  const active = activeSpace.id === item.id
  return (
    <PopoverClose asChild>
      <Box
        key={item.id}
        bgGray100={active}
        bgGray100--hover
        toCenterY
        toBetween
        py3
        px3
        gapX2
        textBase
        roundedLG
        cursorPointer
        transitionColors
        onClick={async () => {
          await store.space.selectSpace(item.id)
        }}
      >
        <Box toCenterY gap2>
          <Bullet size={20} innerSize={6} innerColor={item.color} />
          <Box>{item.name}</Box>
        </Box>
        <Box toCenterY gap1 gray600>
          {item.encrypted && <KeyRound size={16} />}
          {item.isCloud && <Cloud size={16} />}
          {!item.isCloud && <Laptop size={16} />}
        </Box>
      </Box>
    </PopoverClose>
  )
}