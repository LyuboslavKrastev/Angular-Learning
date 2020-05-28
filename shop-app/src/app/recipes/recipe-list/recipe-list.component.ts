import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('First Recipe', 'First Description', 'https://live.staticflickr.com/1441/25154602981_ab2f17e9f8_b.jpg'),
    new Recipe('First Recipe', 'First Description', 'https://live.staticflickr.com/1441/25154602981_ab2f17e9f8_b.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
