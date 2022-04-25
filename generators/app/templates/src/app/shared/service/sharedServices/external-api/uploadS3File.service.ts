import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {  throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UploadS3FileService {

  constructor(private httpClient: HttpClient) { }

  uploadfileAWSS3(fileUploadUrl, contentType, file) {
    //this will be used to upload all csv files to AWS S3
    const headers = new HttpHeaders({'Content-Type': contentType});
    const req = new HttpRequest(
    'PUT',
    fileUploadUrl,
    file,
    {
      headers: headers,
      reportProgress: true, //This is required for track upload process
    });
    return this.httpClient.request(req);
    }

}

 







