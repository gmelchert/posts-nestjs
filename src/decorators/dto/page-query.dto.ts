import { PageDto } from "src/shared";

export class PageQueryDto<q> {
    query: q;
    page: PageDto;
}