import { PostsService } from './services/posts.service';
import { Post } from './models/post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
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
      }, error => {
        this.isFetching = false;
        this.error = error.message;
      });
  }

  onClearPosts() {
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }
}
