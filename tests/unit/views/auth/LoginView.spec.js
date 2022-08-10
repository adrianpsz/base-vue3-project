import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import LoginView from "@/views/auth/LoginView";
import { t } from "../../../utils/test";
import router from "@/router";
import store from "@/store";
import axios from "axios";

jest.mock("@/utils/app");
// eslint-disable-next-line no-unused-vars
import { updateAppMeta } from "@/utils/app";

const config = {
  global: {
    mocks: {
      $t: t,
      updateAppMeta: jest.fn(),
    },
    plugins: [router, store],
    stubs: {
      RouterLink: RouterLinkStub,
      "font-awesome-icon": "FontAwesomeIcon",
    },
    directives: {
      autofocus: () => "",
    },
  },
};

// any call to 'axios.post' returns ""
jest.spyOn(axios, "post").mockResolvedValue("");

let wrapper;
let vm;
let data;
let loginForm;
beforeEach(() => {
  wrapper = shallowMount(LoginView, config);
  vm = wrapper.vm;
  data = vm.$data;
  loginForm = wrapper.get("form#login-form");
});

describe("LoginView.vue", () => {
  it("should show login form", () => {
    expect(loginForm.get("button").text()).toMatch(t("Login"));
  });

  it("should show errors after form validation", async () => {
    await loginForm.trigger("submit");

    expect(data.form.getError("email").length).toBeGreaterThan(0);
    expect(data.form.getError("password").length).toBeGreaterThan(0);
    expect(data.form.isValid()).toBe(false);
  });

  it("should show errors after wrong data input", async () => {
    data.form.getField("email").value = "2s@aaaa";
    data.form.getField("password").value = "aaa";

    await loginForm.trigger("submit");

    expect(data.form.getError("email").length).toBeGreaterThan(0);
    expect(data.form.getError("password").length).toBeGreaterThan(0);
    expect(data.form.isValid()).toBe(false);
  });

  it("should show no errors after correct data input", async () => {
    data.form.getField("email").value = "test@test.com";
    data.form.getField("password").value = "12345678";

    await loginForm.trigger("submit");

    expect(data.form.getError("email").length).toEqual(0);
    expect(data.form.getError("password").length).toEqual(0);
    expect(data.form.isValid()).toBe(true);
  });
});
