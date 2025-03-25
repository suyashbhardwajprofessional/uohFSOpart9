import { isNotNumber } from "./utils";

console.log('hey! require.main === module is ', require.main === module);

interface BmiInputs {
    value1: number;
    value2: number;
  }

const parseArguments = (args: string[]): BmiInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNotNumber(Number(args[2])) && !isNotNumber(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height*0.01)*(height*0.01));
    if(bmi<18.5) return 'underweight';
    else if(bmi<25.0) return 'normal weight';
    else if(bmi<30) return 'overweight';
    else if(bmi<35) return 'obese';
    else return 'morbid obesity';
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }