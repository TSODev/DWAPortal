
export class Category {
  constructor(
    public categoryGroupId: string,
    public childCount: number,
    public createDate: string,
    public guid: string,
    public id: string,
    public modifiedDate: string,
    public name: string,
    public parentId: string,
    public rxId: string,
    public subCategories: string,
    public summary: string
  ) {}
}
