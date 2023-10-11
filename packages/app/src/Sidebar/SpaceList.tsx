import { Box } from '@fower/react'
import { Plus } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  Button,
  modalController,
  PopoverClose,
} from 'uikit'
import { useSpaces, useSpaceService } from '@penx/hooks'
import type { ISpace } from '@penx/local-db'

function SpaceItem({
  item,
  activeSpace,
}: {
  item: ISpace
  activeSpace: ISpace
}) {
  const active = activeSpace.id === item.id
  const spaceService = useSpaceService()
  return (
    <PopoverClose asChild>
      <Box
        key={item.id}
        bgGray100={active}
        bgGray100--hover
        toCenterY
        py3
        px3
        gapX2
        roundedXL
        cursorPointer
        transitionColors
        onClick={async () => {
          await spaceService.selectSpace(item.id)
        }}
      >
        <Avatar roundedFull rounded2XL={active}>
          <AvatarFallback>{item.name}</AvatarFallback>
        </Avatar>
        <Box>{item.name}</Box>
      </Box>
    </PopoverClose>
  )
}

export const SpaceList = () => {
  const { spaces, activeSpace } = useSpaces()

  return (
    <Box toCenterX w-100p p3>
      <Box flex-1 column gap2>
        {spaces?.map((item) => (
          <SpaceItem key={item.id} item={item} activeSpace={activeSpace} />
        ))}
        <Box toCenter mt4>
          <PopoverClose asChild>
            <Button
              variant="ghost"
              w-100p
              onClick={() => {
                modalController.open('CREATE_SPACE_MODAL')
              }}
            >
              <Plus />
              <Box>New Space</Box>
            </Button>
          </PopoverClose>
        </Box>
      </Box>
    </Box>
  )
}