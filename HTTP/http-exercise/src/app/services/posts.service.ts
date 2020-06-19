import { Post } from './../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetDbAddress } from '../../secrets/get-db-address.js';
import { map } from 'rxjs/operators';

const address = GetDbAddress();

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) { }

  createPost(title: string, content: string) {
    const data: Post = { title, content };
    this.http.post<{ name: string }>(address, data)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(address)
      .pipe(map((responseData) => {
        const postsArr: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArr.push({ ...responseData[key], id: key });
          }
        }
        return postsArr;
      }));
  }

  deletePosts() {
    return this.http.delete(address);
  }
}
