import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(bookList: any[], searchText: string): any[] {
    if (!bookList) return [];
    if (!searchText) return bookList;
    searchText = searchText.toLowerCase();
    console.log("searchText", searchText);
    return bookList.filter((book) => {
      return book.bookName.toLowerCase().includes(searchText);
    });
  }
}
