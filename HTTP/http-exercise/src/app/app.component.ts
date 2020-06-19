import { PostsService } from './services/posts.service';
import { Post } from './models/post.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(data: Post) {
    // Send Http request
    this.postsService.createPost(data.title, data.content);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }

  onClearPosts() {
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }
}
