# Datawrapper Charts in React

[Datawrapper](https://www.datawrapper.de) charts are great and easy to create. Some of their functionality relies on `postMessage` and the normal embed code uses `<script>` to catch those messages. In some cases this doesn't play well with React, since React wants to control the DOM.

Here comes `<DWChart />` into play. It's a React component that implements the "smarts" of the `<script>` tag and provides an easy way to embed Datawrapper charts in React applications.

Install it with `npm install react-datawrapper-chart`.

## API

```jsx
import DWChart from 'react-datawrapper-chart'

ReactDOM.render(<DWChart title="Chart" src="//datawrapper.dwcdn.net/rjRUb/7/" />, root)
```

### Props

- `title` (`string` | required) - title attribute for the underlying `iframe`.
- `src` (`string` | required) - src attribute for the underlying `iframe`. This should be the link from the **publish** step of a Datawrapper chart.
- `loading` (`eager|lazy`) - `iframe` loading attribute, which is useful for [lazy loading](https://web.dev/iframe-lazy-loading/).

Additional props will get passed to the `iframe`. If a `height` prop is passed, it will do nothing. The component handles resizing itself. If the height should be fixed, there is no point in using this component and it is recommended to use an `iframe` directly.

### Links

- [Example on CodeSandbox](https://codesandbox.io/s/32y4937kq1?fontsize=14)
- [datawrapper.de](https://www.datawrapper.de/)
