import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
    
    transform(value: string, format ?: string): any {
        if (!value) {
            return "";
        }

        if (!format) {
            format = 'DD/MM/YYYY';
        }

        return moment(value).format(format);
    }
    
}
