import { ValidatorFn, AbstractControl } from "@angular/forms";

export function coordinatesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^-?\d+(.\d+)?,\s*-?\d+(.\d+)?$/.test(control.value);
    if (!valid) {
      return { invalidCoordinates: { value: control.value } };
    }

    const [latitude, longitude] = control.value.split(',').map(Number);
    if (latitude < -90 || latitude > 90) {
      return { latOutOfRange: { value: latitude } };
    }

    if (longitude < -180 || longitude > 180) {
      return { longOutOfRange: { value: longitude } };
    }
    return null;
  };
}

export function LatitudValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^-?\d+(.\d+)?$/.test(control.value);
    if (!valid) {
      return { invalidCoordinates: { value: control.value } };
    }

    const latitude = control.value;
    if (latitude < -90 || latitude > 90) {
      return { latOutOfRange: { value: latitude } };
    }
    return null;
  };
}

export function LongitudeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^-?\d+(.\d+)?$/.test(control.value);
    if (!valid) {
      return { invalidCoordinates: { value: control.value } };
    }

    const longitude = control.value;
    if (longitude < -180 || longitude > 180) {
      return { longOutOfRange: { value: longitude } };
    }
    return null;
  };
}
