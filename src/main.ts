import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  //custom code
  //Start Infinite scroll
  export class InfiniteScroller{
    //var declaration
    private x:number          = 31;
    listArray : string[]      = [];
    private sum:number        = 20;
    private direction:string  = "";

    onWindowScroll() {
      //In chrome and some browser scroll is given to body tag
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
      if (pos == max) {
        this.x += 2;
        console.log("end");
      }
    } //Dont forget me!!!!
    onScrollDown(ev: any) {
      console.log("scrolled down!!", ev);
  
      this.sum += 20;
      this.appendItems();
  
      this.direction = "scroll down";
    }
  
    onScrollUp(ev: any) {
      console.log("scrolled up!", ev);
      this.sum += 20;
      this.prependItems();
  
      this.direction = "scroll up";
    }
  
    appendItems() {
      this.addItems("push");
    }
  
    prependItems() {
      this.addItems("unshift");
    }
  
    addItems(_method: string) {
      for (let i = 0; i < this.sum; ++i) {
        //   this.funMediumService.fun_mediums().subscribe(
        //     (response: FunMedium[]) => {
        //       if(response.length>0){
        //     if( _method === 'push' && (this.sum<response.length)){
        //       this.funMediumList.push(response[i]);
        //     }else if( _method === 'unshift'&& (this.sum<response.length && this.sum>0)){
        //       this.funMediumList.unshift(response[i]);
        //     }
        //   }
        // },(error: HttpErrorResponse) => {alert(error.message);}
        //);
      }
    }
   }
  //END Infinite scroll