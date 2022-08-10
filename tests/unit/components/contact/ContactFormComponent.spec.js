import { shallowMount } from "@vue/test-utils";
import ContactFormComponent from "@/components/contact/ContactFormComponent";
import { getI18n } from "../../../utils/test";

const config = {
  global: {
    mocks: {
      $t: getI18n().global.t,
    },
    stubs: ["FontAwesomeIcon"],
  },
};

let wrapper;
let vm;
let data;
beforeEach(() => {
  wrapper = shallowMount(ContactFormComponent, config);
  vm = wrapper.vm;
  data = vm.$data;
});

describe("ContactFormComponent.vue", () => {
  it("should start with invalid form", () => {
    expect(data.form.isValid()).toBe(false);
  });

  it("should show error when fields are emtpy", () => {
    const isFormValid = data.form.isValid();

    expect(data.form.hasError("name")).toBeTruthy();
    expect(data.form.hasError("email")).toBeTruthy();
    expect(data.form.hasError("subject")).toBeTruthy();
    expect(data.form.hasError("message")).toBeTruthy();
    expect(data.form.hasError("captchaScore")).toBeTruthy();
    expect(isFormValid).toBe(false);
  });

  it("should show error when fields are wrong filled out", async () => {
    await wrapper.get('[name="name"]').setValue("a");
    await wrapper.get('[name="email"]').setValue("a@ahgc");
    await wrapper.get('[name="subject"]').setValue("a");
    await wrapper.get('[name="message"]').setValue("a");
    await wrapper.get('[name="captchaScore"]').setValue("");

    const isFormValid = data.form.isValid();

    expect(data.form.hasError("name")).toBeTruthy();
    expect(data.form.hasError("email")).toBeTruthy();
    expect(data.form.hasError("subject")).toBeTruthy();
    expect(data.form.hasError("message")).toBeTruthy();
    expect(data.form.hasError("captchaScore")).toBeTruthy();
    expect(isFormValid).toBe(false);
  });

  it("should not show errors when fields are correct filled out", async () => {
    await wrapper.get('[name="name"]').setValue("test");
    await wrapper.get('[name="email"]').setValue("test@test.com");
    await wrapper.get('[name="subject"]').setValue("test");
    await wrapper.get('[name="message"]').setValue("test");

    await wrapper
      .get('[name="captchaScore"]')
      .setValue(
        data.form.getField("captcha1").value +
          data.form.getField("captcha2").value
      );

    const isFormValid = data.form.isValid();

    expect(data.form.hasError("name")).toBeFalsy();
    expect(data.form.hasError("email")).toBeFalsy();
    expect(data.form.hasError("subject")).toBeFalsy();
    expect(data.form.hasError("message")).toBeFalsy();
    expect(data.form.hasError("captchaScore")).toBeFalsy();
    expect(isFormValid).toBe(true);
  });
});
