import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import router from "@/router";
import { t } from "../../../utils/test";
import HeaderComponent from "@/components/layout/HeaderComponent";
import store from "@/store";
import { APP } from "@/consts";
import axios from "axios";

const config = {
  global: {
    mocks: {
      $t: t,
    },
    plugins: [router, store],
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
};

// any call to 'axios.post' returns ""
jest.spyOn(axios, "post").mockResolvedValue("");

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(HeaderComponent, config);
});

describe("HeaderComponent.vue", () => {
  it("shows the page title", () => {
    expect(wrapper.text()).toMatch(APP.title);
  });

  it("starts with logged out", () => {
    expect(store.getters["user/isAuthenticated"]).toBe(false);
    expect(wrapper.text()).toMatch(t("Login"));
  });

  it("shows a home page after logged in", async () => {
    store.commit("user/updateApiToken", "1234");
    store.commit("user/updateUser", { name: "test" });

    await wrapper.vm.$nextTick();

    expect(store.getters["user/isAuthenticated"]).toBe(true);
    expect(wrapper.text()).toMatch(t("Home"));
  });

  it("can logout", async () => {
    store.commit("user/updateApiToken", "1234");
    store.commit("user/updateUser", { name: "test" });

    expect(store.getters["user/isAuthenticated"]).toBe(true);

    await wrapper.find("#logout").trigger("click");

    expect(axios.post).toHaveBeenCalled();
    expect(store.getters["user/isAuthenticated"]).toBe(false);
  });
});
