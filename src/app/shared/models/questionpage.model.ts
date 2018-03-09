import { PageItem } from './questionpageitem.model';

export class Page {
    constructor(
            public id: string,
	        public externalId: string,
	        public title: string,
            public pageItems: PageItem[],
    ) {}
}
