Persona 1: Freshmen student no courses taken, plan out raw four year path to fullfil a Computer Science degree. My main barrier is a limited knowledge of courses and requirement for the degree

Persona 2: Senior student who wants to plan out last year, ensuring I finish my degree. Main barrier is knowing what breadth to finish up and what courses that I might have missed.

Person 3: Rising sophomore looking to pick between multiple concentration. Main goal is know what courses would be required for each concentration. Main barrier is that I have no idea what the specialized courses are for each concentration.

Data Model (rough outline):

course{
id:string
name:string
credits:number
courseid: number
prereq: course[]

}

semester{
id: string
name: string
year: number
courses: course[]
season: string ig
credits: number
}

plan{
id: string
name: sting
semester: semester[]
requiredcourses: course[]
}
