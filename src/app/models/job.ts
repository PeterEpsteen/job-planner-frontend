import {Todo} from './todo';
import {Contact} from './contact';
import {EventModel} from './event'
export class Job {
    id: number;
    title: string;
    company: string;
    description: string;
    contacts: Contact[];
    events: EventModel[];
    todos: Todo[];
    companyDomain: string;
    dateAdded: string;
    location: string;
}