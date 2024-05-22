import { Injectable } from '@angular/core';
import * as pack from 'package.json'
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateAlertService {
  currentVersion: string = '';
  registryUrl: string = "https://registry.npmjs.org/@seventty/leaflet-x-legacy";

  constructor(private httpClientService: HttpClient, private toastrService: ToastService) { }

  checkVersion() {
    const packageClone = { ...pack }
    this.currentVersion = packageClone.version;
    this.httpClientService.get(this.registryUrl).pipe(
      map((response: any) => response['dist-tags'].latest),
      catchError(() => {
        console.error('Error fetching version information from npm');
        return [];
      })
    ).subscribe(latestVersion => {
      if (this.isNewVersionAvailable(latestVersion)) {
        this.toastrService.infoToast("New version available!", `Map update available <pre>${this.currentVersion} -> <strong>${latestVersion}</strong></pre>`)
      }
    });
  }

  private isNewVersionAvailable(latestVersion: string): boolean {
    return latestVersion !== this.currentVersion;
  }

}
