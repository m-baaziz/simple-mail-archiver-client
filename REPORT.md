# Report

In order to realize this Single Page Application, I decided to use React with Typescript.
I used `create-react-app` to initialize the project, and setup eslint and prettier to ensure a good coding style.

I used `material-ui` for the style management and some core components.

I started by implementing the DatePicker component. First I implemented it using native date inputs. However I came accross the issue of having one single calendar icon to open a range picker interface. So I finally decided to use `react-dates` (opensource project, backed by Airbnb) for the date range picker. Despite some accessibility issues, it was a time efficient solution to reproduce what was described in the design.

Then I implemented the Search Results part. I decided to use the `Table` component from `material-ui`. To handle the long texts ellipsis and remaining items count (+1, +2 ...), I implemented a `HOC` (cf. `WithEllipsis`) that uses the `IntersectionObserver` API to detect and compute the number of hidden items.

To be able to inspect multiple mails at once, I decided to introduce an additional column with `checkboxes`. Each selected entry will be displayed below the table, in a separate `Card`.

## Getting Started

```
npm install
npm start
```

Tests are run with `npm test`
