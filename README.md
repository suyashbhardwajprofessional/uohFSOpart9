# uohFSOpart9
repository for submissions of part 9 exercises from the FullStackOpen courseware by UniversityOfHelnsiki

01 typescript is: language (syntax), compiler (information erasure ~ transpilation), & language service (intellisense)
02 language features: annotations, keywords, structural typing, type inference, type erasure
03 why typescript: reduce runtime errros/unit testing, code-level documentation (return to work), intellisense assistance
04 TS does not fix: incomplete exernal lib, inferences sometimes needs assistance (using type-guarding/narrowing, type-assertions), mysterious type errors (in complex types)
05 setup a TS project: npm install --location=global ts-node typescript
06 npm install --save-dev ts-node typescript >>
	- ts-node: compiles and executes the specified TypeScript file immediately
	- typescript
	- tsconfig.json: to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore
07 creating your own types
08 the unknown type
09 narrowing of types: using instanceOf
10 npm install --save-dev @types/react... @types/<pkg_name> for its TS definitions
11 parsing command line arguments to ensure correct argumemts
12 array syntaxes: number[] & Array<number>
13 tsconfig flags: noImplicitAny, noUnusedparameters (req or use _req)
14 express: import, require or both
15 ts-node-dev: the nodemon for TS files
16 npm install --save-dev eslint @eslint/js @types/eslint__js typescript typescript-eslint
   other than ts-config, we've eslint: to restrict developers from using the 'any' type
	- rules: { '@typescript-eslint/no-explicit-any': 'error', }, in eslint.config.mjs
17 npm install --save-dev @stylistic/eslint-plugin
	- plugins: { "@stylistic": stylistic, },
	  rules: { '@stylistic/semi': 'error', }, in eslint.config.mjs
18 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment to ignore check on next line
19 validating the types of destructured elements received in req.body
20 type assertion "op as Operation;" to specifically assert a type (unsafe)
21  npm install typescript --save-dev : 
22 npm run tsc -- --init: to initialize a readymade tsconfig.json with commented flags
23 npm run tsc : from TS code to production build JS code
24 "strict": true, flag to set up multiple flags at once
25 ignores: ["build/*"], flag to ignore production build code eslint checks
26 "resolveJsonModule": true flag to enable importing of json files
27 type & interfaces: similar, but cannot duplicate a type
28 comment?: string; : the optional field
29   ├── myModule.json
     └── myModule.ts no same file names
20 the Pick utility type: const getNonSensitiveEntries = (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {}
21 the Omit utility type: const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {}
22 request & response types: Response<any, Record<string, any>, number>  /  (_req, res: Response<NonSensitiveDiaryEntry[]>) => {}
23 const findById = (id: number): DiaryEntry | undefined => {} : possibility of empty response
24 const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {}  / unknown is the ideal type for our kind of situation of input validation
25 Type guards:
	const isString = (text: unknown): text is string => {
	  return typeof text === 'string' || text instanceof String;
	};

	const isDate = (date: string): boolean => {
	  return Boolean(Date.parse(date));
	};

	const isWeather = (str: string): str is Weather => {
	  return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
	};

	const parseComment = (comment: unknown): string => {
	  if (!comment || !isString(comment)) {
	    throw new Error('Incorrect or missing comment');
	  }
	
	  return comment;
	};
26 enums: export enum Visibility {
	  Great = 'great',
	  Good = 'good',
	  Ok = 'ok',
	  Poor = 'poor',
	}

	const isVisibility = (param: string): param is Visibility => {
	  return Object.values(Visibility).map(v => v.toString()).includes(param);
	};

27 alternate: schema validation library: npm install zod
	const newEntrySchema = z.object({
	  weather: z.nativeEnum(Weather),
	  visibility: z.nativeEnum(Visibility),
	  date: z.string().date(),
	  comment: z.string().optional()
	});
	
	const newDiaryEntry = NewEntrySchema.parse(req.body);
28 purpose of TS in react apps: catch errors for
	- Trying to pass an extra/unwanted prop to a component
	- Forgetting to pass a required prop to a component
	- assing a prop with the wrong type to a component

29 react app with TS: npm create vite@latest my-app-name -- --template react-ts
30 const Welcome = ({ name }: { name: string }): JSX.Element => (
	  <h1>Hello, {name}</h1>
	); 
31 

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

32 typing useState: const [notes, setNotes] = useState<Note[]>([]);
33 (event: React.SyntheticEvent) => {}
34 axios.get<Note[]>('http://localhost:3001/notes').then(response => {}

march 24, 2025
01 warm-up, been through exercise submissions & course certificate issue info
02 been through part 9A, & a fragment of part9B
03 slept
04 struggled to set up typescript plug-in in sublime
05 slept, been through part 9B fragment
06 did exercise 9.1

march 25, 2025
01 slept, did exercise 9.2
02 slept, did exercise 9.3
03 slept, did exercise 9.4
04 did exercise 9.5
05 did exercise 9.6, 9.7
06 did exercise 9.8, 9.9

march 26, 2025
01 gdgsm reference explored
02 been through a fragment of part 9C
03 slept
04 manifested the read fragment of part 9C
05 slept
06 did exercises 9.10, 9.11
07 tried groundworks on fgagment after

march 27, 2025
01 slept
02 slept, got the groundwork functional
03 did exercises 9.12, 9.13
04 slept, did exercise 9.14
05 did exercise 9.15
06 been through a fragment of part 9D, tried exercise 9.16 - failed

march 28, 2025
01 did exercise 9.16
02 been through the fragment 9D post exercise 9.16
03 did exercises 9.17, 9.18
04 did exercise 9.19, 9.20
05 slept

march 29, 2025
01 slept
02 slept
03 slept, did exercise 9.21