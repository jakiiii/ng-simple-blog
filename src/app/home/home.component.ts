import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { Http } from '@angular/http';

import { VideoItem } from '../videos/video';
import { VideoService } from '../videos/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService]
})
export class HomeComponent implements OnInit, OnDestroy {
  private req: any;
	homeImageList: [VideoItem] = [] as [VideoItem]
  videoList: [VideoItem];
  videoListDetaultImage = 'assets/images/default/image_default.jpg'

  constructor(private router:Router, private http:Http, private _video: VideoService) { }

  ngOnInit() {
    this.req = this._video.list().subscribe(data=>{
      data.filter(item=>{
        if (item.featured) {
          let dataItem = item
            this.homeImageList.push(dataItem)
        }
      })
    })

    this.req = this._video.list().subscribe(data=>{
      this.videoList = data as [VideoItem];
    })
  }

  ngOnDestroy() {
    this.req.unsubscribe()
  }

  preventNormal(event:MouseEvent, image:any) {
  	if (!image.prevented){
  		event.preventDefault()
  		this.router.navigate(['./videos'])
  	}
  }

}
