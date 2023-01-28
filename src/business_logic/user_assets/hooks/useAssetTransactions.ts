import { useAppDispatch, useAppSelector } from 'store'
import useAuth from 'business_logic/auth/hooks/useAuth'
import { useEffect } from 'react'
import { PurchaseAsset } from 'business_logic/user_assets/redux/thunk'
import { CreateUserAssetTransactionRequest } from 'business_logic/user_assets/ts'

export const useAssetTransactions = () => {
  const { userAsset, loading, error } = useAppSelector(state => state.asset)
  const dispatch = useAppDispatch()
  const handlePurchaseAsset = ({ assetId, quantity, price, transactionDate }: CreateUserAssetTransactionRequest) => {
    return dispatch(PurchaseAsset({ assetId, quantity, price, transactionDate }))
  }

  return { userAsset, loading, error, handlePurchaseAsset }
}