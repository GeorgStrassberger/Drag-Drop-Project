namespace App {
    // Validation
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput: Validatable): boolean {
        let isValid: boolean = true;
        // wenn required existiert
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        // wenn minLength existiert und ein string ist
        if (
            validatableInput.minLength != null &&
            typeof validatableInput.value === "string"
        ) {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        // wenn maxLength existiert und ein string ist
        if (
            validatableInput.maxLength != null &&
            typeof validatableInput.value === "string"
        ) {
            isValid =
                isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        // wenn min existiert und eine number ist
        if (
            validatableInput.min != null &&
            typeof validatableInput.value === "number"
        ) {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        // wenn max existiert und eine number ist
        if (
            validatableInput.max != null &&
            typeof validatableInput.value === "number"
        ) {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
}