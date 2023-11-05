import { Box } from '@fower/react'
import { ICellNode, IColumnNode, IRowNode } from '@penx/types'
import { FIRST_COL_WIDTH } from '../../constants'
import { IconDrag } from '../icons/IconDrag'
import { TableCell } from './Cell'

interface Props {
  index: number
  row: IRowNode
  columns: IColumnNode[]
  cells: ICellNode[]
}

export const TableRow = ({ columns = [], row, cells = [], index }: Props) => {
  // TODO: need to improve performance
  const rowCells = columns.map((column) => {
    return cells.find(
      (cell) =>
        cell.props.rowId === row.id && cell.props.columnId === column.id,
    )!
  })
  return (
    <Box flex-1 toLeft className="gridRow">
      <Box
        className="grid-cell"
        inlineFlex
        toCenterY
        pl3
        px2
        w={FIRST_COL_WIDTH}
        // h-100p
        bgTransparent
        borderBottom
        borderLeft
        // borderRight
        flexShrink={0}
      >
        <IconDrag invisible visible--$gridRow--hover bgTransparent />
        <Box as="input" type="checkbox" hidden inlineBlock--$gridRow--hover />
        <Box textXS inlineBlock hidden--$gridRow--hover>
          {(index || 0) + 1}
        </Box>
      </Box>

      {rowCells.map((cell, index) => (
        <TableCell key={cell.id} cell={cell} columns={columns} index={index} />
      ))}
    </Box>
  )
}
