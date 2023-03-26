import { Project, ProjectStatus } from "../models/project.js";

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>): void {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstace(): ProjectState {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number): void {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus): void {
        const project = this.projects.find(prj => prj.id === projectId);
        // only it exist and has a new statsus, change it and rerender the list
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); //get a copy of the array;
        }
    }
}

// Globale Instanz
// to garentiet to work always with the exact same object and we will only have 1 object all the time, in the entire application
export const projectState = ProjectState.getInstace();

