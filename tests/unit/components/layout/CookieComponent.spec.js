import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import router from "@/router";
import CookieComponent from "@/components/layout/CookieComponent";
import { t } from "../../../utils/test";

const config = {
  global: {
    mocks: {
      $t: t,
    },
    plugins: [router],
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(CookieComponent, config);
});

describe("CookieComponent.vue", () => {
  it("should show message, that the website uses cookies", () => {
    const message = wrapper.find("#cookie-message");

    expect(message.classes()).not.toContain("d-none");
  });

  it("can close message and accept cookie", async () => {
    await wrapper.get("#accept-cookie-message").trigger("click");

    const message = wrapper.find("#cookie-message");
    expect(message.classes()).toContain("d-none");
  });
});
