import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  fileName: string = '';
  @Input() imageUrl!: string;
  @Output() fileEmitter = new EventEmitter<{ file: File; fileName: string }>();

  http = inject(HttpClient);
  constructor() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileEmitter.emit({ file: file, fileName: file.name });
      this.imageUrl = URL.createObjectURL(file);
    }
  }
}
