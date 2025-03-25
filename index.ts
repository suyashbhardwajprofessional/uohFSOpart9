import express from 'express';
import { calculateBmi } from './bmiCalculator';
import bodyParser from 'body-parser';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if(isNotNumber(height) || isNotNumber(height))
    res.json({
        error: 'malformatted text'
    });
    else
    res.json({
        height,
        weight,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if(!target || !daily_exercises ) { res.json({error: "parameters missing"}); }
    if(daily_exercises.some((element:any) => isNaN(Number(element)))) { res.json({error: "malformatted parameters"}); }
    res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});