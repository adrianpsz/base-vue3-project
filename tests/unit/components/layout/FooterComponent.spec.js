import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import FooterComponent from "@/components/layout/FooterComponent";
import router from "@/router";
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
  wrapper = shallowMount(FooterComponent, config);
});

describe("FooterComponent.vue", () => {
  it("shows footer menu with homepage", () => {
    expect(wrapper.text()).toMatch(t("Homepage"));
  });
});
