interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescBase extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirement extends CoursePartDescBase {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch(coursePart.kind) {
    case 'basic': return (<i>{coursePart.description}</i>)
    case 'group': return (<p style={{marginTop:'0px'}}>project exercises {coursePart.groupProjectCount}</p>)
    case 'background': return (<>
      <i>{coursePart.description}</i>
      <p style={{marginTop:'0px'}}>submit to {coursePart.backgroundMaterial}</p>
    </>)
    case 'special': return (<>
      <i>{coursePart.description}</i>
      <p style={{marginTop:'0px'}}>required skills: {coursePart.requirements.join()}</p>
    </>)
    default: return (<></>)
  }
}

const Header = ({ courseName }: { courseName:string }) => {
  return(<h1>{courseName}</h1>)
} 

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return(<div>
    
    {courseParts.map((onepart)=> <>
      <h4 style={{marginBottom: '0px'}}>{onepart.name} {onepart.exerciseCount}</h4>
      <Part coursePart = {onepart} />
    </>)}
    
  </div>)
}

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return(<>
    <p>
      Number of exercises {totalExercises}
    </p>
  </>)
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName = {courseName} />
      <Content courseParts = {courseParts} />
      <Total totalExercises = {totalExercises} />
    </div>
  );
};

export default App;