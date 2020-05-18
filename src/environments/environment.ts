// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8080/",

  RESET_URL: "resetPassword/",
  VERIFY_URL: "/registration/verify/",
  BOOK_BASE_URL: "book/bookdetails/",
  ADD_TO_CART: "cart/bookdetails/",
  REMOVE_FROM_CART: "cart/book/",
  ADD_TO_WISHLIST: "whishList/book/",
  REMOVE_FROM_WISHLIST: "/whishList/remove_books_WhishList/",
  SORT_BY_LOW_TO_HIGH: "book/sortbylowprice/",
  SORT_BY_HIGH_TO_LOW: "book/sortbyhighprice/",
  SORT_BY_NEW_ARRIVALS: "book/sortbyarrival/",
  VERIFY_WHISHLIST_BOOK: "whishList/verify_book/",
  VERIFY_CART_BOOK: "cart/verify_book/",
  GET_BOOKS_COUNT: "book/bookscount",
  PROFILE_CHANGE_OR_UPLOAD:"user/uploaduserimage",
  Get_book_Cart: "cart/cartdetials",
  book_count_cart: "cart/bookCount",
  cart_inc_bookquantity: "cart/incr_booksquantity",
  cart_desc_bookquantity: "cart/desc_booksquantity",
  cart_verify_book: "cart/verify_book",
  whishlist_books: "whishList/book",
  whishlist_books_remove: "whishList/book/",
  whishList_book_count: "whishList/book_count",
  orderlist_books_confrim: "orders/confrim/",
  orderlist_books: "orders/books/",
  orderlist_books_Count: "orders/books_count/",
  user_profile: "user/profileUrl",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
