import { AbstractControl } from '@angular/forms';

export function ValidateSelect(selectControl:AbstractControl){
    if(selectControl.value < 1){
        return {validOption:true};
    }
    return null;
}