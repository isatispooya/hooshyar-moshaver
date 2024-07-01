import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="مشاوران"
            total={15}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="ثبت نام کنندگان"
            total={150}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="تعداد مشاوره های شما تا کنون "
            total={3}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="مشاوره های فعال شما"
            total={1}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppTasks
            title="Tasks"
            list={[
              {
                id: '1',
                name: 'مشاوره با اقای دکتر محمد زمانی ',
                type: 'تلفنی ',
                date: '12/6/04',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '3',
                name: 'مشاوره با خانم دکتر سارا اسدی',
                type: 'حضوری',
                date: '12/9/19',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '4',
                name: 'مشاوره با اقای دکتر رضا مقدم ',
                type: 'حضوری ',
                date: '12/10/30',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '5',
                name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                type: 'تلفنی ',
                date: '12/12/5',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '6',
                name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                type: 'تلفنی ',
                date: '12/12/5',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '7',
                name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                type: 'تلفنی ',
                date: '12/12/5',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '8',
                name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                type: 'تلفنی ',
                date: '12/12/5',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '9',
                name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                type: 'تلفنی ',
                date: '12/12/5',
                status: <Iconify icon="gravity-ui:check"/>,
              },
              {
                id: '10',
                name: 'مشاوره با خانم دکتر مریم امیرجلیلی',
                type: 'تلفنی ',
                date: '12/12/5',
                status: <Iconify icon="gravity-ui:check"/>,
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
