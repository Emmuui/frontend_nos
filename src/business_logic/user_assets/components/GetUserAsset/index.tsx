import useUserAsset from 'business_logic/user_assets/hooks/useUserAsset'
import { Button } from '@mui/material'

export const GetUserAsset = () => {
  const { userAsset, loading } = useUserAsset()
  console.log('test', userAsset)

  return (
    <div>
      { loading ? (<h1>loading</h1>) : (<h1>not loading</h1>)}
    </div>
  )
}
