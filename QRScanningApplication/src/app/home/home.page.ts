import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from "jsqr";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedItems = []
  scannerActive = false;
  scanResult = null;
  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('fileinput', {static: false}) fileinput: ElementRef;

  videoInstance : any;
  canvasInstance: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement = null;

  constructor(
    private toastController : ToastController,
    private loadingController: LoadingController
    ) {

  }

  ngAfterViewInit(){
    this.videoInstance = this.video.nativeElement;
    this.canvasInstance = this.canvas.nativeElement;
    this.canvasContext = this.canvasInstance.getContext('2d');
  }

  uploadImage(){
    this.fileinput.nativeElement.click();
  }

  handleFile(files: FileList){
    const file  = files.item(0);

    var img = new Image();
    img.onload = () => {
      this.canvasContext.drawImage(img, 0, 0, this.canvasInstance.width, this.canvasInstance.height);
      const imageData = this.canvasContext.getImageData(
        0,0, this. canvasInstance.width, this.canvasInstance.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      if(code){
        this.scanResult = code.data;
        this.scannedItems.push(this.scanResult);
        this.showToast();
      }
    };
    img.src = URL.createObjectURL(file);
  }

  async scan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment'}
    });
    this.videoInstance.srcObject = stream;
    // this.videoInstance.setAttribute('playsinline', true);
    this.videoInstance.play();

    this.loading = await this.loadingController.create({})
    await this.loading.present();
    requestAnimationFrame(this.callScanner.bind(this));
  }

  async callScanner(){
    if(this.videoInstance.readyState === this.videoInstance.HAVE_ENOUGH_DATA) {
      if(this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scannerActive = true;
      }

      this.canvasInstance.height = this.videoInstance.videoHeight;
      this.canvasInstance.width = this.videoInstance.videoWidth;

      this.canvasContext.drawImage(
        this.videoInstance, 0, 0, this.canvasInstance.width, this.canvasInstance.height
      );

      const image = this.canvasContext.getImageData(
        0,0, this. canvasInstance.width, this.canvasInstance.height
      );
      
      const code = jsQR(image.data, image.width, image.height, {
        inversionAttempts: 'dontInvert'
      });
      if(code){
        this.scannerActive=false;
        this.scanResult=code.data;
        this.scannedItems.push(this.scanResult);
        this.showToast();
      }else{
        if(this.scannerActive){
          requestAnimationFrame(this.callScanner.bind(this));
        }
      }
    }else{
      requestAnimationFrame(this.callScanner.bind(this));
    }

  }

  reset(){
    this.scanResult = null;
  }

  stopScan(){
    this.scannerActive = false;
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: `View ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'View',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

}