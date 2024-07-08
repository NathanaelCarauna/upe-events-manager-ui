import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import useStyles from "./index.module.css";
import logoPernambuco from "../../images/pernambuco_logo.png";
import logoUpe from "../../images/logo_upe.png";

export default function Footer() {
  const theme = useTheme();
  const classes = useStyles;

  return (
      <Box
          className={classes.footer_bar}
          sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              padding: theme.spacing(1),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'left',
          }}
      >
          <a href="/">
              <img src={logoPernambuco} className={classes.footer_logo_governo} alt="logo"/>
          </a>
          <a href="/">
              <img src={logoUpe} className={classes.footer_logo_upe} alt="logo"/>
          </a>
          <Box className={classes.info_box}>
              <Typography variant="body2" className={classes.info_title}>
                  Universidade de Pernambuco
              </Typography>
              <Typography variant="body2" className={classes.info_title}>
                  Campus Garanhuns
              </Typography>
              <Typography variant="body2">
                  R. Cap. Pedro Rodrigues - São José, Garanhuns - PE CEP: 55294-902 | Fone: (87) 3761-8227
              </Typography>
          </Box>
      </Box>
  );
}
