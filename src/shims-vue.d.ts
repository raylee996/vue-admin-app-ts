declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "vue/types/vue" {
  import axios, { AxiosInstance } from "axios";
  interface Vue {
      $http: AxiosInstance;
  }
}
