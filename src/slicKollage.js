(function (doc) {

  const _extendDefaults = Symbol("extendDefaults");
  const _validateOptions = Symbol("validateOptions");

  const SlicKollage = class {
    constructor(options = null) {
      this[_validateOptions](options);
      const _defaults = {};

      if (arguments[0] && typeof arguments[0] === "object") {
        this.options = this[_extendDefaults](_defaults, arguments[0]);
      }
    }

    // public methods

    // static methods

    // private methods
    [_extendDefaults](source, properties) {
      for (const property in properties) {
        if (properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
    }

    [_validateOptions](options) {
      if (!options) {
        throw "Missing SlicKollage Configuration";
      } else {
        if (!(options.images && options.images.length)) {
          throw "Images array not provided";
        }

        if (!options.selector) {
          throw "No selector provided for collage";
        }
      }
    }
  };

  const init = options => {
    try {
      return new SlicKollage(options);
    } catch (e) {
      console.error(e);
    }
  };

  this.SlicKollage = this.__SK = init;
}(document));
