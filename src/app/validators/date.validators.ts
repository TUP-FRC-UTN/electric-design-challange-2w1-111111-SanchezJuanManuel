import { FormControl, ValidationErrors } from "@angular/forms";

export class DateValidator {
    static lesserThanToday(control: FormControl): ValidationErrors | null {
        const today = new Date();
        const controlDate = new Date(control.value);

        if (controlDate < today) {
            return {
                lesserThanToday: true
            };
        }

        return null;
    }
}