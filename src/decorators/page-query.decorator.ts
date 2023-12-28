import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const PageQuery = createParamDecorator((_, context: ExecutionContext) => {
    const whereContainsQuery = {};

    const { query } = context.switchToHttp().getRequest();
    const pageQuery = Number(query.page);

    const take = 8;
    const skip = isNaN(pageQuery) ? 0 : (take * (pageQuery - 1));

    const page = { skip, take };

    delete query.page;

    const queryValues = Object.values(query);
    const queryKeys = Object.keys(query);

    queryKeys.forEach((key, index) => {
        const value = queryValues[index];
        whereContainsQuery[key] = { contains: value }
    })
    return { query: whereContainsQuery, page }
})