import { Box, Card, CardContent, Grid, Icon, Typography } from '@mui/material';

const DashboardCard = ({ item, isActive, handleSelectItem }) => {
  const Icon = item.icon;

  return (
    <Grid item xs={6} key={item.id} sx={{mx: { xs: 'auto', sm: 0 }}}>
      <Card
        sx={{
          width: 200,
          height: { xs: 140, sm: 180 },
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: 1,
          borderColor: isActive ? item.color : 'divider',
          borderRadius: 3,
          backgroundColor: isActive ? `${item.color}08` : 'background.paper',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
            borderColor: item.color,
          },
        }}
        onClick={() => handleSelectItem(item.id)}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: { xs: 1.5, sm: 3 },
          }}
        >
          <Box
            sx={{
              width: { xs: 50, sm: 70 },
              height: { xs: 50, sm: 70 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${item.color}15`,
              color: item.color,
              mb: { xs: 1, sm: 2 },
              border: 2,
              borderColor: `${item.color}30`,
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: { xs: 24, sm: 32 } }} />
          </Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: { xs: '0.85rem', sm: '1.1rem' },
              lineHeight: 1.2,
              textAlign: 'center',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default DashboardCard;
