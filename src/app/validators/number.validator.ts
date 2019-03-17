import { AbstractControl } from '@angular/forms';

export function isNumber(selectControl:AbstractControl){
    const regex = /^[0-9\s]*$/;
    if(isNaN(selectControl.value) || !regex.test(selectControl.value)){
        return {validValue:true};
    }
    return null;
}