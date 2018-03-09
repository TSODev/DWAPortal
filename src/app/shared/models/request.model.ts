
import { PageItem } from './questionpageitem.model';
import { Option } from './questionoption.model';
import { Questionnaire } from './questionnaire.model';
import { Answer } from './answer.model';


export class Request {
  constructor(
    public requestId: string,
	public externalId: string,
    public questionnaire: Questionnaire,
	public defaultAnswer: Answer[],
	public onStartChanges: {},
    public serviceId: string,
    
) {}

}


