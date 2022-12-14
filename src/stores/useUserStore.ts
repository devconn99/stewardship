import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";
import { Org, User } from "~/interfaces";
import Cookies from "js-cookie";
import { security } from "~/constants";
import { useRuntimeConfig } from "#app";

interface State {
  user: User | null;
  isLoading: boolean;
}

export default defineStore("user", {
  state: (): State => ({
    user: null,
    isLoading: true,
  }),
  getters: {
    isLoggedIn(state: State): boolean {
      return !!state.user;
    },
    isOrgAdmin(state: State): boolean {
      return !!(state.user?.membership?.is_org_admin);
    },
    org(state: State): Org | null {
      return state.user?.membership?.org || null;
    },
    isOrgHor(state: State): boolean {
      return state.user?.membership?.org.pk === 1;
    },
    isOrgYsgn(state: State): boolean {
      return state.user?.membership?.org.pk === 2;
    },
  },
  actions: {
    async loadUser() {
      this.isLoading = true;
      const api = useApi();

      const userRes = await api.$get("/users/me/");
      if (userRes.status === 200) {
        this.user = userRes.data;

        // Fetch CSRF token after logging user in.
        const csrfRes = await api.$get("/auth/csrf");
        const token = csrfRes.headers[security.xsrfHeader];
        Cookies.set(security.xsrfCookie, token);
      }

      this.isLoading = false;
    },
    async logout() {
      this.isLoading = true;
      const api = useApi();
      await api.$post("/users/logout/");
      this.user = null;
      this.isLoading = false;

      const config = useRuntimeConfig();
      window.location.href = `${config.public.accountsBase}/login`;
    },
  },
});
