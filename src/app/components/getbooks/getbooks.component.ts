import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-getbooks",
  templateUrl: "./getbooks.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./getbooks.component.scss"],
})
export class GetbooksComponent implements OnInit {
  sort: any = "Sort by relevance";
  sortTech1: any = "Price : Low to High";
  sortTech2: any = "Price : High to Low";
  sortTech3: any = "Newest Arrivals";
  images = [
    [
      {
        colorCode: "rgba(198, 222, 255,1)",
        name: "Blue",
      },
      {
        colorCode: "rgba(229, 228, 226,1)",
        name: "Gray",
      },
      {
        colorCode: "rgba(230, 169, 236,1)",
        name: "Pink",
      },
      {
        colorCode: "rgba(230, 169, 236,1)",
        name: "Pink",
      },
    ],
    [
      {
        colorCode: "rgba(233, 171, 23,1)",
        name: "Yellow",
      },
      {
        colorCode: "rgba(249, 150, 107,1)",
        name: "Orange",
      },
      {
        colorCode: "rgba(255,255,255,1)",
        name: "white",
      },
      {
        colorCode: "rgba(230, 169, 236,1)",
        name: "Pink",
      },
    ],
  ];
  constructor() {}

  ngOnInit() {
    this.sort;
  }
  doSorting(option: any) {
    this.sort = option;
    if (option == "Sort by relevance") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Newest Arrivals";
    }
    if (option == "Price : Low to High") {
      this.sortTech1 = "Price : High to Low";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
    }
    if (option == "Price : High to Low") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
    }
    if (option == "Newest Arrivals") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Sort by relevance";
    }
  }
  page: number = 1;
  searchBookOnTitle: any;
  sortBy: string = "none";
  selectedOption: any;
  length: number;
  cartSize: number;
}
