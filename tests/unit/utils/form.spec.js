import { t } from "../../utils/test";
import Form from "@/utils/form";

let form;
beforeEach(() => {
  form = Form.create(t);
});

describe("form.js", () => {
  it("can create a form field and validate it positive", () => {
    form.addField("field", "value", {
      required: true,
    });

    expect(form.isValid()).toBeTruthy();
  });

  it("can create a form field and validate it negative", () => {
    form.addField("field", "", {
      required: true,
    });

    expect(form.isValid()).toBeFalsy();
  });

  it("can create a number field and validate it positive", () => {
    form.addNumberField("field1", "12").addNumberField("field2", "12.5");

    expect(form.isValid()).toBeTruthy();
  });

  it("can create a form field and validate it negative", () => {
    form.addNumberField("field1", "123fsaa");

    expect(form.isValid()).toBeFalsy();
  });

  it("can add to the field custom validator", () => {
    form
      .addNumberField("field1", "0")
      .addNumberField("field2", "13")
      .addNumberField("field3", "13", (value) => {
        return parseInt(form.getField("field1").value) +
          parseInt(form.getField("field2").value) ===
          parseInt(value)
          ? ""
          : "error";
      });

    expect(form.isValid()).toBeTruthy();
  });
});
