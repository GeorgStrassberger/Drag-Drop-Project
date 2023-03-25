/// <reference path="base-component.ts" />

namespace App {
    // ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];

        // shotcut - add accessor in front of a parameter to automaticly create a same name property to store the value equal to the named parameter
        // with a litaral type
        constructor(private type: "active" | "finished") {
            super("project-list", "app", false, `${type}-projects`);
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }

        @autobind
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }

        }

        @autobind
        dropHandler(event: DragEvent): void {
            const prjId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        }

        @autobind
        dragLeaveHandler(_: DragEvent): void {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable');
        }

        configure(): void {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);

            projectState.addListener((projects: Project[]): void => {
                const relevantProjects: Project[] = projects.filter((prj: Project): boolean => {
                    if (this.type === "active") {
                        return prj.status === ProjectStatus.Active;
                    }
                    return prj.status === ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }

        renderContent(): void {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul")!.id = listId;
            this.element.querySelector("h2")!.textContent =
                this.type.toUpperCase() + " PROJECTS";
        }

        private renderProjects(): void {
            const listEl = document.getElementById(
                `${this.type}-projects-list`
            )! as HTMLUListElement;
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
            }
        }
    }

}