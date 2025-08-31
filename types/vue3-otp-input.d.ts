declare module "vue3-otp-input" {
  import { DefineComponent } from "vue";
  const VOtpInput: DefineComponent<{
    value?: string;
    "onUpdate:value"?: (value: string) => void;
    "input-classes"?: string;
    "num-inputs"?: number;
    separator?: string;
    "should-auto-focus"?: boolean;
    placeholder?: string[];
    "input-type"?: string;
    "on-complete"?: (value: string) => void;
  }>;
  export default VOtpInput;
}
