import React from 'react';
import getConfig from 'next/config';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const fetchData = async (keyword) => {
  const { API_HOST } = getConfig().publicRuntimeConfig;
  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);
  const host = process?.browser ? '' : API_HOST;
  try {
    const res = await fetch(`${host}/api/shops?${query.toString()}`);
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

const Shops = ({ shops, debug }) => {
  return (
    <Container component="main" maxWidth="md">
      <div>{JSON.stringify(debug)}</div>
      <Box
        component="form"
        noValidate
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <List>
          {shops.length === 0 && <div>お店が見つかりません</div>}
          {shops.map((shop) => {
            return (
              <ListItem key={shop.id}>
                <ListItemButton
                  onClick={() => {
                    // TODO: goto shop detail
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={shop.name} src={shop.logo_image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${shop.genre.name} ${shop.name}`}
                    secondary={
                      <>
                        <Typography variant="body1" component="span">
                          {`${shop.catch} ${shop.shop_detail_memo}`}
                        </Typography>
                        <Typography variant="caption">{shop.address}</Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export const getServerSideProps = async (req) => {
  const data = await fetchData(req.query.keyword);

  // ---------
  const query = req?.query?.keyword ?? 'うどん';
  const host = process?.browser ? '' : API_HOST;
  const { API_HOST } = getConfig().publicRuntimeConfig;
  const debug = {
    query: `${host}/api/shops?${query.toString()}`,
    host,
    API_HOST,
  };
  // ---------
  return {
    props: {
      shops: data,
      debug,
    },
  };
};
export default Shops;
