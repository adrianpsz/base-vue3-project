import IndexView from "@/views/pages/IndexView";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import router from "@/router";
import { getI18n, t } from "../../../utils/test";

global.document.getElementsByTagName = (name) => {
  return {
    description: {
      content: name,
    },
    keywords: {
      content: name,
    },
  };
};

const config = {
  global: {
    mocks: {
      $t: getI18n().global.t,
    },
    plugins: [router],
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
};

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(IndexView, config);
});

describe("IndexView.vue", () => {
  it("shows index page", () => {
    expect(wrapper.text()).toMatch(t("Last news"));
  });
});
