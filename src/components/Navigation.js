import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EightKIcon from '@mui/icons-material/EightK';
import MenuIcon from '@mui/icons-material/Menu';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { blue, grey } from '@mui/material/colors';
import { ThemeContext } from './ThemeContext';
import { makeStyles } from '@material-ui/core';
import { useLogin } from './useLogin';
import { CheckLogin } from './CheckLogin';

export default function Navigation() {
  const { profile, login } = useLogin();
  const { dark } = useContext(ThemeContext);
  const [openDiaglog, setOpenDiaglog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDiaglog(true);
  };

  const handleCloseDialog = () => {
    setOpenDiaglog(false);
  };
  const useStyle = makeStyles(() => ({
    darkTheme: {
      '& .navigation_bar': {
        '&.css-hip9hq-MuiPaper-root-MuiAppBar-root': {
          backgroundColor: grey[800],
          fontFamily: 'monospace',
        },
        '& .custom_button': {
          '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
            '& .custom_link': {
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
            },
            '& .custom_icon': {
              height: '1.25rem',
              width: '1.25rem',
            },
            '&.custom_sign_in': {
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
            },
            '& .custom_news_without_sigin': {
              display: 'flex',
              color: 'white',
              '& .css-ahj2mt-MuiTypography-root': {
                color: 'white'
              }
            }
          },
          '& .css-ahj2mt-MuiTypography-root': {
            fontFamily: 'monospace',
            textTransform: 'none',
          },
        }
      },
      '&.custom_menu': {
        '&.small_menu': {
          display: { xs: 'block', md: 'none' },
        },
        '&.big_menu': {
          display: { xs: 'none', md: 'block' },
        },
        '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
          border: '0.1rem solid grey',
          backgroundColor: grey[800],
        },
        '& .custom_menu_item': {
          '&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
            '& .custom_link': {
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
            },
            '& .custom_icon': {
              height: 25,
              width: 25,
              margin: '0.3rem 0.2rem 0.3rem 0',
              '&.icon_menu': {
                height: '1.25rem',
                width: '1.25rem',
              }
            },
            '& .custom_button': {
              color: 'white',
              '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
                textTransform: 'none',
                padding: 0,
                borderRadius: 0,
              }
            },
            '& .custom_txt': {
              fontSize: '1.2rem'
            }
          },
          '& .css-ahj2mt-MuiTypography-root': {
            fontFamily: 'monospace',
            fontSize: '150%'
          },
        },
      },
    },
    whiteTheme: {
      '& .navigation_bar': {
        '&.css-hip9hq-MuiPaper-root-MuiAppBar-root': {
          backgroundColor: blue[900],
          fontFamily: 'monospace',
        },
        '& .custom_button': {
          '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
            '& .custom_link': {
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
            },
            '& .custom_icon': {
              height: '1.25rem',
              width: '1.25rem',
            },
            '&.custom_sign_in': {
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
            },
            '& .custom_news_without_sigin': {
              display: 'flex',
              color: 'white',
              '& .css-ahj2mt-MuiTypography-root': {
                color: 'white'
              }
            }
          },
          '& .css-ahj2mt-MuiTypography-root': {
            fontFamily: 'monospace',
            textTransform: 'none',
          },
        }
      },
      '&.custom_menu': {
        '&.small_menu': {
          display: { xs: 'block', md: 'none' },
        },
        '&.big_menu': {
          display: { xs: 'none', md: 'block' },
        },
        '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
          border: '0.1rem solid blue',
          backgroundColor: blue[900],
        },
        '& .custom_menu_item': {
          '&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
            '& .custom_link': {
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
            },
            '& .custom_icon': {
              height: 25,
              width: 25,
              margin: '0.3rem 0.2rem 0.3rem 0',
              '&.icon_menu': {
                height: '1.25rem',
                width: '1.25rem',
              }
            },
            '& .custom_button': {
              color: 'white',
              '&.css-1e6y48t-MuiButtonBase-root-MuiButton-root': {
                textTransform: 'none',
                padding: 0,
                borderRadius: 0,
              }
            },
            '& .custom_txt': {
              fontSize: '1.2rem'
            }
          },
          '& .css-ahj2mt-MuiTypography-root': {
            fontFamily: 'monospace',
            fontSize: '150%'
          },
        },
      },
    }
  }))

  const classes = useStyle();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box className={dark ? classes.darkTheme : classes.whiteTheme}>
      <AppBar className={`navigation_bar`} position="static">
        <Container maxWidth="90%">
          <Toolbar disableGutters>

            {/* Small Menu */}
            <EightKIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PHEPHIMVN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                className={dark ? `custom_menu small_menu ${classes.darkTheme}` : `custom_menu small_menu ${classes.whiteTheme}`}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {profile &&
                  <MenuItem className='custom_menu_item' onClick={handleCloseNavMenu}>
                    <Link className='custom_link' to='/setting'>
                      <Avatar className='custom_icon' alt="Google Avatar" src={profile.picture} />
                      <Typography variant='body1'>Settings</Typography>
                    </Link>
                  </MenuItem>
                }
                <MenuItem className='custom_menu_item' onClick={handleCloseNavMenu}>
                  <Link className='custom_link' to='/'>
                    <OtherHousesIcon className='custom_icon' />
                    <Typography variant='body1'>Home</Typography>
                  </Link>
                </MenuItem>
                <MenuItem className='custom_menu_item' onClick={handleCloseNavMenu}>
                  {
                    profile ?
                      <Link className='custom_link' to='/news'>
                        <NewspaperIcon className='custom_icon' />
                        <Typography variant='body1'>News</Typography>
                      </Link>
                      :
                      <Button className='custom_button' onClick={handleOpenDialog}>
                        <NewspaperIcon className='custom_icon' />
                        <Typography variant='body1'>News</Typography>
                      </Button>
                  }
                </MenuItem>
                {
                  profile ?
                    <MenuItem className='custom_menu_item' onClick={handleCloseNavMenu}>
                      <Button className='custom_button' onClick={handleOpenDialog}>
                        <LogoutIcon />
                        <Typography variant='body1'>Sign Out</Typography>
                      </Button>
                    </MenuItem>
                    :
                    <MenuItem className='custom_menu_item' onClick={handleCloseNavMenu}>
                      <Button className='custom_button' onClick={() => login()}>
                        <AccountCircleIcon />
                        <Typography variant='body1'>Sign In</Typography>
                      </Button>
                    </MenuItem>
                }
              </Menu>
            </Box>

            {/* Big Menu */}
            <EightKIcon sx={{ display: { xs: 'flex', md: 'none' } }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PHEPHIMVN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button className='custom_button' onClick={handleCloseNavMenu}>
                <Link className='custom_link' to='/'>
                  <OtherHousesIcon className='custom_icon' />
                  <Typography>Home</Typography>
                </Link>
              </Button>
              {
                profile ?
                  <Button className='custom_button' onClick={handleCloseNavMenu}>
                    <Link className='custom_link' to='/news' >
                      <NewspaperIcon className='custom_icon' />
                      <Typography>News</Typography>
                    </Link>
                  </Button>
                  :
                  <Button className='custom_button' onClick={handleOpenDialog}>
                    <Box className='custom_news_without_sigin'>
                      <NewspaperIcon className='custom_icon' />
                      <Typography>News</Typography>
                    </Box>

                  </Button>
              }
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip>
                {
                  profile ?
                    <IconButton
                      size="small"
                      onClick={handleOpenUserMenu}
                    >
                      <Avatar alt="Google Avatar" src={profile.picture} />
                    </IconButton>
                    :
                    <Button className='custom_button custom_sign_in' onClick={() => login()}>
                      <AccountCircleIcon className='custom_icon' />
                      <Typography variant='body1'>Sign In</Typography>
                    </Button>
                }
              </Tooltip>
              {
                profile &&
                <Menu
                  className={dark ? `custom_menu big_menu ${classes.darkTheme}` : `custom_menu big_menu ${classes.whiteTheme}`}
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  anchorEl={anchorElUser}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem className='custom_menu_item' onClick={handleCloseUserMenu}>
                    <Link className='custom_link' to='/setting'>
                      <SettingsIcon className='custom_icon icon_menu' />
                      <Typography className='custom_txt' variant='body1'>Settings</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem className='custom_menu_item' onClick={handleCloseUserMenu}>
                    <Button className='custom_button' onClick={handleOpenDialog}>
                      <LogoutIcon className='custom_icon icon_menu' />
                      <Typography className='custom_txt' variant='body1'>Sign Out</Typography>
                    </Button>
                  </MenuItem>
                </Menu>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CheckLogin open={openDiaglog} handleClose={handleCloseDialog} profile={profile} />
    </Box>
  )
}
