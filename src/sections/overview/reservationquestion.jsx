/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import {
  Radio,
  Divider,
  Accordion,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';

import Iconify from 'src/components/iconify';

import { questions } from './questionConfig';

const Reservationquestion = () => {
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.option));


  console.log(selectedOptions);
  return (
    <div style={styles.container}>
      <div style={styles.quizBox}>
        <Typography color="#3f51b5" variant="h3" gutterBottom>
          سوالات
        </Typography>
        <Typography mb={2} variant="body1" gutterBottom>
          سوالات زیر را بخوانید و پاسخ مناسب دهید
        </Typography>
        <Divider />
        <div style={styles.questionContainer}>
          <Typography variant="h6" style={styles.question}>
            1. شما چند سال سن دارید؟
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            id="outlined-number"
            label="سن شما"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {questions.map((q, qIndex) => (
          <Accordion key={qIndex} style={styles.accordion}>
            <AccordionSummary expandIcon={<Iconify icon="gravity-ui:plus" />}>
              <Typography variant="h6" style={{fontSize: '16px',marginTop: '15px',  borderRadius: '30px',color: selectedOptions[qIndex] ? 'inherit' : 'red'}} >
                {q.num}. {q.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={`quiz-${qIndex}`}
                  name={`quiz-${qIndex}`}
                  value={selectedOptions[qIndex]}
                >
                  {q.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      style={styles.option}
                      onChange={((e)=>setSelectedOptions(e.target.value))}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  quizBox: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '750px',
    textAlign: 'right',
    border: '10px solid #fafafa',

  },
  questionContainer: {
    marginBottom: '25px',
    paddingBottom: '15px',

  },
  option: {
    margin: '10px 0',
  },
  accordion: {
    marginBottom: '15px',
  },
};

export default Reservationquestion;
