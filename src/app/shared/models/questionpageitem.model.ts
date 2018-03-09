import { Answer } from './answer.model';
import { Option } from './questionoption.model';

export class PageItem {
    constructor(
        public type: string,
        public id: string,
	    public externalId: string,
	    public visible: boolean,
        public label: string,
        public description: string,
	    public required: boolean,
	    public hidden: boolean,
	    public readOnly: boolean,
        public answerSource: string,
        public options: Option[],
        public defaultAnswers: Answer[],
    ) {}
}
