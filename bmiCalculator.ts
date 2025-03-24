const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height*0.01)*(height*0.01))
    if(bmi<18.5) return 'underweight';
    else if(bmi<25.0) return 'normal weight';
    else if(bmi<30) return 'overweight';
    else if(bmi<35) return 'obese';
    else return 'morbid obesity';
}

console.log(calculateBmi(180, 74))