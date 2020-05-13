// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8080/",

  BOOK_BASE_URL: "book/getBooks/",
  ADD_TO_CART: "cart/add_books_cart/",
  REMOVE_FROM_CART: "cart/remove_books_cart/",
  ADD_TO_WISHLIST: "/whishList/add_books_WhishList/",
  REMOVE_FROM_WISHLIST: "/whishList/remove_books_WhishList/",
  SORT_BY_LOW_TO_HIGH: "book/getBooksSortedByPriceLow/",
  SORT_BY_HIGH_TO_LOW: "book/getBooksSortedByPriceHigh/",
  SORT_BY_NEW_ARRIVALS: "book/getBooksSortedByArrival/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
