import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import {
    ArgumentMetadata,
    PipeTransform,
    Scope,
} from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { HelperArrayService } from 'src/common/helper/services/helper.array.service';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';

export function PaginationFilterInEqualPipe(
    defaultValue: string[]
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterInEqualPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService,
            private readonly helperArrayService: HelperArrayService
        ) {}

        async transform(
            value: string,
            { data: field }: ArgumentMetadata
        ): Promise<Record<string, { $in: string[] }>> {
            let finalValue: string[] = defaultValue as string[];

            if (value) {
                finalValue = this.helperArrayService.unique(
                    value.split(',')
                );
            }

            this.request.__filters = {
                ...this.request.__filters,
                [field]: finalValue,
            };
               console.log(finalValue+"------------");
            return this.paginationService.filterIn<string>(field, finalValue);
        }
    }

    return mixin(MixinPaginationFilterInEqualPipe);
}
