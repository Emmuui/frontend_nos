import * as React from 'react'
import styles from './styles.module.scss'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material'

type AssetType = {
  head: Array<{
    label: string
  }>
  data: Array<{
    id: number
    image: string
    asset_name: string
    symbol: string
    totalValue: number
    avgBuyPrice: number
    totalQuantity: number
    currencyPrice: number
  }>
}

const AssetTableData = ({ head, data }: AssetType) => {
  return (
    <TableContainer component={TableContainer} className={styles.table_container}>
      <Table sx={{ minWidth: 650}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {head.map(head => (
              <TableCell component='th' scope='row' key={head.label} align={'left'}>
                {head.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody color={'white'}>
          {data.map(data => (
            <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center'>
                <div className={styles.flex_component}>
                  <Avatar alt={data.asset_name} src={data.image} className={styles.asset_image}/>
                  {data.asset_name}
                </div>
              </TableCell>
              <TableCell align='left'>{data.symbol}</TableCell>
              <TableCell align='left'>{data.totalValue.toFixed(2)}</TableCell>
              <TableCell align='left'>{data.avgBuyPrice.toFixed(2)}</TableCell>
              <TableCell align='left'>{data.totalQuantity.toFixed(2)}</TableCell>
              <TableCell align='left'>{data.currencyPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AssetTableData
