import { Page } from './questionpage.model';

export class Questionnaire {
    constructor(
        public id: string,
	    public guid: string,
	    public createDate: string,
	    public modifiedDate: string,
	    public rxId: string,
	    public summary: string,
	    public workflowId: string,
	    public questionnaireGroupId: string,
	    public name: string,
        public pages: Page[],
    ) {}
}
