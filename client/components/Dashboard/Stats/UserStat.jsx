import React, { useMemo } from 'react';
import {
  Chart as Chartjs,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

Chartjs.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Bar, Pie } from 'react-chartjs-2';
import {
  interestLvStatData,
  interestLvStatOptions,
  locationStatData,
  locationStatOptions,
  meanStatData,
  meanStatOptions,
  roleStatData,
  roleStatOptions,
  santinizeUserStatData,
  SchoolStatData,
  SchoolStatOptions,
} from 'utils';
import { Grid } from '@mui/material';
import styles from '@styles/Dashboard/Stat.module.scss';

/**
 * @author
 * @function UserStat
 **/

export const UserStat = ({ data }) => {
  const userData = useMemo(() => santinizeUserStatData(data), [data]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={styles.chartWrapper}>
            <div className={styles.chart}>
              <Pie
                data={roleStatData(userData.role[0], userData.role[1])}
                options={roleStatOptions}
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.chartWrapper}>
            <Bar
              data={locationStatData(
                userData.location[0],
                userData.location[1]
              )}
              options={locationStatOptions}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.chartWrapper}>
            <Bar
              data={SchoolStatData(userData.school[0], userData.school[1])}
              options={SchoolStatOptions}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.chartWrapper}>
            <Bar
              data={meanStatData(userData.mean[0], userData.mean[1])}
              options={meanStatOptions}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className={styles.chartWrapper}>
            <Bar
              data={interestLvStatData(
                userData.interest[0],
                userData.interest[1]
              )}
              options={interestLvStatOptions}
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
