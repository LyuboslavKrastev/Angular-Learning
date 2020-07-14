import { Post } from "./../models/post.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetDbAddress } from "../secrets/get-db-address.js";
import { map, catchError } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

const address = GetDbAddress();

@Injectable({ providedIn: "root" })
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createPost(title: string, content: string) {
    const data: Post = { title, content };
    this.http.post<{ name: string }>(address, data).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        this.error.next(error.message);
      }
    );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(address, {
        headers: new HttpHeaders({
          "Custom-Hader": "Gretings",
        }),
        params: new HttpParams().set("print", "pretty"),
      })
      .pipe(
        map((responseData) => {
          const postsArr: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArr.push({ ...responseData[key], id: key });
            }
          }
          return postsArr;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deletePosts() {
    return this.http.delete(address);
  }
}
