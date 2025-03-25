// import { isNotNumber } from "./utils";

interface ExerciseCalcInputs {
    firstValue: number;
    restArray: number[];
  }

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExArguments = (args: string[]): ExerciseCalcInputs => {
    const receivedListOfValues = args.splice(2);
    if (receivedListOfValues.length < 2) throw new Error('Not enough arguments');
    if(!receivedListOfValues.some(element => isNaN(Number(element)))) {
        return {
            firstValue: Number(receivedListOfValues[0]),
            restArray: receivedListOfValues.slice(1).map(x=>Number(x))
        };
    } else throw new Error('inappropriate inputs');
  };

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
    const sampleSize = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(exh=>exh!==0).length;
    const totalExHours = dailyExerciseHours.reduce((a,b)=>a+b);
    const averageExHours = totalExHours/sampleSize;
    const generatedFeedback = averageExHours>=targetAmount ? 'target achieved!' : 'not too bad but could be better';
    const howIsItDone = averageExHours>targetAmount+1? 3: (averageExHours>=targetAmount? 2: 1 );
    return {
        periodLength: sampleSize,
        trainingDays: trainingDays,
        success: averageExHours>=targetAmount,
        rating:howIsItDone,
        ratingDescription: generatedFeedback,
        target:targetAmount,
        average: averageExHours,
    };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const { firstValue, restArray } = parseExArguments(process.argv);
    console.log(calculateExercises(restArray, firstValue));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }