import { Box, Container, Grid, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export default function Footer() {
  const { theme, toggle, dark } = useContext(ThemeContext)
  return (
    <Box component={'footer'} sx={dark ? { backgroundColor: grey[800], marginTop: '1.5rem' } : { backgroundColor: blue[900], marginTop: '1.5rem' }} color={'white'} fontSize={'1.5rem'}>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body1' fontFamily={'monospace'}>Head Office: SASP AC Arles-Avignon 470 Avenue Pierre de Coubertin BP 70211 - 84009 Avignon Cedex 1</Typography>
              <Typography variant='body1' fontFamily={'monospace'}>Branch: 4 Tô Hiệu, street, Liên Chiểu, Đà Nẵng, Việt Nam</Typography>
              <Typography variant='body1' fontFamily={'monospace'}>Phone: 0925287767</Typography>
              <Typography variant='body1' fontFamily={'monospace'}>Hotline: 04.32.44.82.90</Typography>
              <Typography variant='body1' fontFamily={'monospace'}>Fax: 04.90.84.16.82</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant='body1' fontFamily={'monospace'}>Copyright © 2022</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
