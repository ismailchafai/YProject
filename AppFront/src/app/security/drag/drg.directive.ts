// import {Directive, HostBinding, HostListener, Output, output} from '@angular/core';
// import {DomSanitizer} from "@angular/platform-browser";
//
// import  {EventEmitter} from  '@angular/core'
// import {FileHandle} from "../../sahred/model/file-handle.model";
// @Directive({
//     standalone: true,
//     selector: '[appDrag]'
// })
// export class DragDirective {
//   @Output() files:EventEmitter<FileHandle>=new EventEmitter();
//
//   @HostBinding("style.background") private background = "#eee"
//
//   constructor(private sanitizer: DomSanitizer) {
//   }
//
//   @HostListener("dragover", ["$event"])
//   public onDragOver(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     // this.background = "#999"
//     // console.log("fonction 1  onDragOver(evt: DragEvent)")
//   }
//
//   @HostListener("dragleave", ["$event"])
//   public onDragLeave(evt: DragEvent) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     // this.background = "#999"
//     // console.log("fonction 2  onDragLeave(evt: DragEvent)")
//   }
//
//   @HostListener("drop", ["$event"])
//   public onDrop(evt: DragEvent) {
//     //mon image
//     // @ts-ignore
//     console.log(evt.dataTransfer.files[0])
//     evt.preventDefault();
//     evt.stopPropagation();
//     // this.background = "#eee";
//     // console.log("fonction 3  onDrop(evt: DragEvent)")
//     let fileHandle: FileHandle;
//     // @ts-ignore
//     const file = evt.dataTransfer.files[0];
//     const url = this.sanitizer.bypassSecurityTrustUrl(
//       window.URL.createObjectURL(file)
//     );
//     fileHandle = {file, url}
//     this.files.emit(fileHandle);
//   }
// }
//
//
//



import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { FileHandle } from "../../sahred/model/file-handle.model";

@Directive({
  standalone: true,
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    // @ts-ignore
    console.log(evt.dataTransfer.files[0]);
    evt.preventDefault();
    evt.stopPropagation();

    let fileHandle: FileHandle;
    // @ts-ignore
    const file = evt.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    fileHandle = { file, url };
    this.files.emit(fileHandle);
  }
}
