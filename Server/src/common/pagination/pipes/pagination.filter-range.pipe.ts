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

export function PaginationFilterRangePipe(
    defaultValue: number[]
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterRangePipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService,
            private readonly helperArrayService: HelperArrayService
        ) {}

        async transform(
            value: string,
            { data: field }: ArgumentMetadata
        ): Promise<Record<string, { $gte?: number; $lte?: number }>> {
            let rangeValues: number[] = defaultValue as number[];

            if (value) {
                rangeValues = this.helperArrayService.unique(
                    value.split(',').map(Number)
                );
            }

            // const rangeFilter: Record<string, { $gte?: number; $lte?: number }> = {};

            // if (!isNaN(rangeValues[0])) {
            //     rangeFilter.Record.$gte = rangeValues[0];
            // }

            // if (!isNaN(rangeValues[1])) {
            //     rangeFilter.Record.$lte = rangeValues[1];
            // }

            this.request.__filters = {
                ...this.request.__filters,
                [field]: rangeValues,
            };
 console.log(rangeValues+"---------")
            return this.paginationService.filterRange<number>(field, rangeValues);
        }
    }

    return mixin(MixinPaginationFilterRangePipe);
}
