import { Control } from "angular2/common";

interface ValidationResult{
   [key:string]:boolean;
}

export class NumberValidator {

    static isTexto(control: Control): ValidationResult { 

      if ( control.value != "" && isNaN( control.value ) ){
        return {"isTexto": true};
      }
    
      return null;
    }
   
    static usernameTaken(control: Control): Promise<ValidationResult> {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === "prueba") {
                    resolve({"usernameTaken": true})
                } else {
                    resolve(null);
                };
                
            }, 1000);
        });

    }
}