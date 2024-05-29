import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { version } from "./../../utils/version"
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateAlertService {
  currentVersion: string = '';
  registryUrl: string = "https://registry.npmjs.org/@seventty/leaflet-x-legacy";

  constructor(private httpClientService: HttpClient, private toastrService: ToastService) { }

  checkVersion() {
    this.currentVersion = version;
    this.httpClientService.get(this.registryUrl).pipe(
      map((response: any) => response['dist-tags'].latest),
      catchError(() => {
        console.error('Error fetching version information from npm');
        return [];
      })
    ).subscribe(latestVersion => {
      if (this.isNewVersionAvailable(latestVersion)) {
        const lastShownVersion = localStorage.getItem("lastShownVersion");

        const toastOptions = {
          html: `Map update available <pre>${this.currentVersion} -> <strong>${latestVersion}</strong></pre>`,
          timer: 0,
          //showConfirmButton: true,
          //confirmButtonText: 'Ver Changelog'
        }

        if (!environment.production && this.currentVersion !== lastShownVersion) {
          this.toastrService.infoToast("New version available!", '', {
            ...toastOptions
          })
        }

        localStorage.setItem("lastShownVersion", this.currentVersion);
      }
    });
  }

  private isNewVersionAvailable(latestVersion: string): boolean {
    return latestVersion !== this.currentVersion;
  }

}
