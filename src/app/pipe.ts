import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterAll'})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchText: any): any {
    if(!searchText) {
      return value;
    }
    return value.filter((data) => this.matchValue(data,searchText)); 
  }

  matchValue(data, value) {
    return Object.keys(data).map((key) => {
       return new RegExp(value, 'gi').test(data[key]);
    }).some(result => result);
  }
 }

 @Pipe({ name: 'filter'})
export class FilterAllResponces implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any {
    if (!items || !filter) {
      return items;
    }

    const key = Object.keys(filter)[0];
    const value = filter[key];

    return items.filter((e) => e[key].indexOf(value) !== -1);
  }
}
@Pipe({name: 'filter',pure: false})
export class FilterPipeS implements PipeTransform {
  transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
    return items.filter(item => {
      let matches = Object.keys(filter).every(f => {
        return filter[f] === 'All' || item[f] == filter[f];
      })

      return matches;
    })
  }
}
//https://www.geeksforgeeks.org/explain-pure-and-impure-pipe-in-angular/
//https://stackoverflow.com/questions/34164413/how-to-apply-filters-to-ngfor
//https://long2know.com/2017/04/angular-pipes-filtering-on-multiple-keys/
//https://stackoverflow.com/questions/41672578/filter-on-multiple-columns-using-one-pipe-angular-2
@Pipe({name: 'filterObject',pure: false})
export class FilterPipeObj implements PipeTransform {
  transform(items: any, filter: any, isAnd: boolean): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isAnd) {
        return items.filter(item =>
            filterKeys.reduce((memo, keyName) =>
                (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            console.log(keyName);
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });
      }
    } else {
      return items;
    }
  }
}

@Pipe({name: 'filterNew'})
export class FilterPipeNew implements PipeTransform {
  transform(myobjects: Array<object>, args?: Array<object>): any {
    if (args && Array.isArray(myobjects)) {
      // copy all objects of original array into new array of objects
      var returnobjects = myobjects;
      // args are the compare oprators provided in the *ngFor directive
      args.forEach(function (filterobj) {
        let filterkey = Object.keys(filterobj)[0];
        let filtervalue = filterobj[filterkey];
        myobjects.forEach(function (objectToFilter) {
          if (objectToFilter[filterkey] != filtervalue && filtervalue != "") {
            // object didn't match a filter value so remove it from array via filter
            returnobjects = returnobjects.filter(obj => obj !== objectToFilter);
          }
        })
      });
      // return new array of objects to *ngFor directive
      return returnobjects;
    }
  }
}
@Pipe({name: 'orderBy', pure: true})
export class OrderByPipe implements PipeTransform {

    transform(value: any[], propertyName: string, reverse: boolean): any[] {
       if (propertyName && !reverse)
         return value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
       else if (propertyName && reverse) {
        let arr = value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
         return arr.reverse();
       }
       else
         return value;
    }
}
@Pipe({name: 'sortByOrder'})
export class SortByOrderPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((n1,n2) => 
    {
      return n1.order - n2.order; 
    });
  }
}