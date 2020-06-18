import { Rating } from "./rating";

export class Book {
  public bookId: number;
  public bookName: string;
  public bookAuthor: string;
  public bookPrice: number;
  public noOfBooks: number;
  public bookImage: string;
  public bookDescription: string;
  public reviewRating: Array<Rating>;
  public quantitybto: any;
  public orderId: any;
  public isAdded: boolean;
  public isListed: boolean;
  public totalPrice: any;
  public quantity: any;
  public bookcountincart: number;
}
