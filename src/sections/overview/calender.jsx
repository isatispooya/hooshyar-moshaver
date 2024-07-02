/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import Chip from '@mui/material/Chip';

const styles = {
  calendarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  },
  rmdpWrapper: {
    transform: 'scale(1.5)',
  },
  rmdpCalendar: {
    maxWidth: 'none',
  },
  headerText: {
    marginBottom: '20px',
    fontSize: '20px',
    textAlign: 'center',
  },
  information: {
    padding: '10px 80px 10px 80px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  chip: {
    margin: '5px',
  },
};


function Information() {
const [time,setTime]=useState(null)
console.log(time);






  
  const chips = ['8_9', '9_10', '10_11', '11_12', '12_13', '13_14', '14_15'];



  

  return (
    <div style={styles.information}>
      <div>انتخاب زمان</div>
      {chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onClick={() => setTime(chip)}
          variant="outlined"

          sx={{margin: '5px',backgroundColor:chip === time ? 'green' : 'default',color:chip === time ? 'white' : 'default'}}
        />
      ))}
    </div>
  );
}

export default function CalendarTime() {
  return (
    <>
      <div style={styles.headerText}>لطفا تاریخ و زمان مشاوره خود را انتخاب کنید</div>
      <div style={styles.calendarContainer}>
        <div style={styles.rmdpWrapper}>
          <Calendar
            multiple
            format="MM/DD/YYYY HH:mm"
            plugins={[<Information />]}
            mapDays={({ date }) => {
              const isWeekend = [0, 6].includes(date.weekDay.index);

              if ([11, 12, 13, 14, 2, 8, 25].includes(date.day))
                return { disabled: true, style: { color: '#ccc' } };

              if (isWeekend)
                return {
                  disabled: true,
                  style: { color: 'red' },
                };
            }}
            calendar={persian}
            locale={persian_fa}
          />
        </div>
      </div>
    </>
  );
}
