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



export function PaginationFilterInEqualNumberPipe(
    defaultValue: number[]
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
        ): Promise<Record<string, { $in: number[] }>> {
            let finalValue: number[] = defaultValue as number[];

            if (value) {
                finalValue = this.helperArrayService.unique(
                    value.split(',').map(Number)
                );
            }

            this.request.__filters = {
                ...this.request.__filters,
                [field]: finalValue,
            };

            return this.paginationService.filterIn<number>(field, finalValue);
        }
    }

    return mixin(MixinPaginationFilterInEqualPipe);
}
