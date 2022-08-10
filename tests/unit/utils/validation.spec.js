import { Validation } from "@/utils/validation";
import { t } from "../../utils/test";

let validation;
beforeEach(() => {
  validation = new Validation(t);
});
describe("validation.js", () => {
  it("can validate required", () => {
    expect(validation.required("value")).toHaveLength(0);
    expect(validation.required(true)).toHaveLength(0);
    expect(validation.required(1)).toHaveLength(0);
    expect(validation.required(0)).toHaveLength(0);
    expect(validation.required(undefined).length).toBeGreaterThan(1);
    expect(validation.required(null).length).toBeGreaterThan(1);
    expect(validation.required(false).length).toBeGreaterThan(1);
    expect(validation.required("").length).toBeGreaterThan(1);
  });
  it("can validate required checkbox", () => {
    expect(validation.requiredCheckbox(true)).toHaveLength(0);
    expect(validation.requiredCheckbox(1)).toHaveLength(0);
    expect(validation.requiredCheckbox(null).length).toBeGreaterThan(1);
    expect(validation.requiredCheckbox(false).length).toBeGreaterThan(1);
    expect(validation.requiredCheckbox(0).length).toBeGreaterThan(1);
  });
  it("can validate minLength", () => {
    expect(validation.minLength("test", 3)).toHaveLength(0);
    expect(validation.minLength("test", 5).length).toBeGreaterThan(1);
  });
  it("can validate maxLength", () => {
    expect(validation.maxLength("test", 255)).toHaveLength(0);
    expect(validation.maxLength("t".repeat(256), 255).length).toBeGreaterThan(
      1
    );
  });
  it("can validate isEmail", () => {
    expect(validation.isEmail("test@test.com")).toHaveLength(0);
    expect(validation.isEmail("test@test").length).toBeGreaterThan(1);
    expect(validation.isEmail("test@").length).toBeGreaterThan(1);
    expect(validation.isEmail("testtest").length).toBeGreaterThan(1);
    expect(validation.isEmail("test@test.").length).toBeGreaterThan(1);
  });
  it("can validate minValue", () => {
    expect(validation.minValue(3, 3)).toHaveLength(0);
    expect(validation.minValue(1, 3).length).toBeGreaterThan(1);
  });
  it("can validate maxValue", () => {
    expect(validation.maxValue(10, 10)).toHaveLength(0);
    expect(validation.maxValue(11, 10).length).toBeGreaterThan(1);
  });
  it("can validate equalValue", () => {
    expect(validation.equalValue(10, 10)).toHaveLength(0);
    expect(validation.equalValue(11, 10).length).toBeGreaterThan(1);
  });
  it("can validate isNumber", () => {
    expect(validation.isNumber("123")).toHaveLength(0);
    expect(validation.isNumber("11as").length).toBeGreaterThan(1);
  });
});
