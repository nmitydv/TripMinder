import { Doc, DocPaging } from "src/common/doc/decorators/doc.decorator";
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { RatingGetSerialization } from "../serialization/rating.get.serialization";

export function RatingCreatedDoc(): MethodDecorator {
    return applyDecorators(
        Doc<RatingGetSerialization>('rating.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
            },
        })
    );

}

export function RatingByBookingIdDoc(): MethodDecorator {
    return applyDecorators(
        Doc<RatingGetSerialization>('rating.get', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                serialization: RatingGetSerialization 
            },
        })
    );
}
