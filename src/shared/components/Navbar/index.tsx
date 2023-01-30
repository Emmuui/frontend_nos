import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material'
import styles from './styles.module.scss'

import useAuth from 'business_logic/auth/hooks/useAuth'

const settings = ['Manage your assets', 'Logout']

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isAuth, user, LogOut, dispatch } = useAuth()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(LogOut())
  }

  const handleDashboard = () => {
    navigate('/')
  }

  const handleManageUserAssets = () => {
    navigate('/get_user_asset')
  }

  const handleSettings = (menu: string) => {
    if (menu === 'Logout') {
      handleLogout()
    }
    if (menu === 'Manage your assets') {
      handleManageUserAssets()
    }
  }
  const handleSignIn = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/sign_up')
  }

  return (
    <Box position='static' className={styles.navbar__container}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'wheat',
              textDecoration: 'none',
            }}
            className={styles.navbar__ico}
            onClick={handleDashboard}
          >
            Nosis.io | Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuth ? (
              <>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.username ?? ''} src={user?.avatarUrl ?? ''} />
                    <Typography variant='inherit' sx={{
                      ml: 2,
                      fontFamily: 'monospace',
                      fontWeight: 500,
                      letterSpacing: '.1rem',
                      color: 'wheat',
                      textDecoration: 'none',
                    }}>{user?.username}</Typography>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(menu => (
                    <MenuItem key={menu} onClick={() => handleSettings(menu)}>
                      <Typography textAlign='center'>{menu}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box display={'flex'}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleSignIn}>
                  <Typography variant='inherit'>Sign In</Typography>
                </Button>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} variant={'contained'} onClick={handleSignUp}>
                  <Typography variant='inherit'>Sign Up</Typography>
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  )
}
export default Navbar
