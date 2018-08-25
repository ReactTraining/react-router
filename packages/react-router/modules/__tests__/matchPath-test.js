import matchPath from "../matchPath";

describe("matchPath", () => {
  describe('with path="/"', () => {
    it('returns correct url at "/"', () => {
      const path = "/";
      const pathname = "/";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/");
    });

    it('returns correct url at "/somewhere/else"', () => {
      const path = "/";
      const pathname = "/somewhere/else";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/");
    });
  });

  describe('with path="/somewhere"', () => {
    it('returns correct url at "/somewhere"', () => {
      const path = "/somewhere";
      const pathname = "/somewhere";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/somewhere");
    });

    it('returns correct url at "/somewhere/else"', () => {
      const path = "/somewhere";
      const pathname = "/somewhere/else";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/somewhere");
    });
  });

  describe("with sensitive path", () => {
    it("returns non-sensitive url", () => {
      const options = {
        path: "/SomeWhere"
      };
      const pathname = "/somewhere";
      const match = matchPath(pathname, options);
      expect(match.url).toBe("/somewhere");
    });

    it("returns sensitive url", () => {
      const options = {
        path: "/SomeWhere",
        sensitive: true
      };
      const pathname = "/somewhere";
      const match = matchPath(pathname, options);
      expect(match).toBe(null);
    });
  });

  describe("with no path", () => {
    it("returns parent match", () => {
      const parentMatch = {
        url: "/test-location/7",
        path: "/test-location/:number",
        params: { number: 7 },
        isExact: true
      };
      const match = matchPath("/test-location/7", {}, parentMatch);
      expect(match).toBe(parentMatch);
    });

    it("returns null when parent match is null", () => {
      const pathname = "/some/path";
      const match = matchPath(pathname, {}, null);
      expect(match).toBe(null);
    });
  });

  describe("with relative path (no leading slash)", () => {
    it("returns correct match url and params with no parent", () => {
      const pathname = "/7";
      const options = {
        path: ":number"
      };
      const match = matchPath(pathname, options, null);
      expect(match.url).toBe("/7");
      expect(match.params).toEqual({ number: "7" });
    });
    it("returns correct match url and params with parent", () => {
      const pathname = "/test-location/7";
      const options = {
        path: ":number"
      };
      const parentMatch = {
        url: "/test-location",
        path: "/test-location",
        params: {},
        isExact: true
      };
      const match = matchPath(pathname, options, parentMatch);
      expect(match.url).toBe("/test-location/7");
      expect(match.params).toEqual({ number: "7" });
    });
    it("passes along parent match params", () => {
      const pathname = "/test-location/hello/7";
      const options = {
        path: ":number"
      };
      const parentMatch = {
        url: "/test-location/:something",
        path: "/test-location/hello",
        params: { something: "hello" },
        isExact: true
      };
      const match = matchPath(pathname, options, parentMatch);
      expect(match.url).toBe("/test-location/hello/7");
      expect(match.params).toEqual({ something: "hello", number: "7" });
    });
  });

  describe("cache", () => {
    it("creates a cache entry for each exact/strict pair", () => {
      // true/false and false/true will collide when adding booleans
      const trueFalse = matchPath("/one/two", {
        path: "/one/two/",
        exact: true,
        strict: false
      });
      const falseTrue = matchPath("/one/two", {
        path: "/one/two/",
        exact: false,
        strict: true
      });
      expect(!!trueFalse).toBe(true);
      expect(!!falseTrue).toBe(false);
    });
  });
});
