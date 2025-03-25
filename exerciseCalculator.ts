interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): Result => {
    const sampleSize = dailyExerciseHours.length
    const trainingDays = dailyExerciseHours.filter(exh=>exh!==0).length
    const totalExHours = dailyExerciseHours.reduce((a,b)=>a+b)
    const averageExHours = totalExHours/sampleSize
    const generatedFeedback = averageExHours>=targetAmount ? 'target achieved!' : 'not too bad but could be better'
    const howIsItDone = averageExHours>targetAmount+1? 3: (averageExHours>=targetAmount? 2: 1 )
    return {
        periodLength: sampleSize,
        trainingDays: trainingDays,
        success: averageExHours>=targetAmount,
        rating:howIsItDone,
        ratingDescription: generatedFeedback,
        target:targetAmount,
        average: averageExHours,
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))