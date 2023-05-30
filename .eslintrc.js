module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-console': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx', '.ts'] }],
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    // 'no-unused-expressions': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/heading-has-content': 0,
    'linebreak-style': 0,
    'max-len': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks 函数组件名必须大写
    'react-hooks/exhaustive-deps': 0, // Checks effect dependencies
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/ban-types': 0,
    'import/order': 0,
    'no-param-reassign': 0,
    'no-var': 1, // 禁用var，用let和const代替
    'no-plusplus': 0, // 可以使用++，--
    'no-multi-assign': 0,
    'spaced-comment': [0, 'never'], // 允许注释//没有空格
    'no-nested-ternary': 0, // 允许多元表达式
    'no-else-return': 2, // 如果if语句里面有return,后面不能跟else语句
    'no-unused-vars': 1,
    eqeqeq: [0, 'allow-null'], // 使用 === 替代 == allow-null允许null和undefined==
    // indent: [2], // 缩进风格
    semi: [2, 'always'], // 语句强制分号结尾
    'prefer-template': 0, //取消强制使用模板字符串
    'no-plusplus': 0, //可以使用++，--
    '@typescript-eslint/no-use-before-define': 0, // 取消在定义之前禁止使用变量或者函数 ts默认会提示
    'react/no-array-index-key': 0, //可以使用index作为key, 但是只能是展示列表的时候使用
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
