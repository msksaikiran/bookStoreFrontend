import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortBooks",
})
export class SortBooksPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return null;
  }
}
