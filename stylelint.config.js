module.exports = {
  extends: "stylelint-config-sass-guidelines",
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "extend",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "scss/percent-placeholder-pattern": null,
    "max-nesting-depth": null,
    "string-quotes": null,
  },
};
