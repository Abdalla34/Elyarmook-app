declare module "vue-tel-input" {
  import { DefineComponent } from "vue";
  export const VueTelInput: DefineComponent<{
    modelValue?: string;
    mode?: string;
    onlyCountries?: string[];
    defaultCountry?: string;
    validCharactersOnly?: boolean;
    inputOptions?: {
      showDialCode?: boolean;
      showFlags?: boolean;
      showDialCodeInSelection?: boolean;
      [key: string]: any;
    };
  }>;
}
