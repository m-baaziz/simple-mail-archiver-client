# Improvements

## Date Picker

### Problems

- Difficult to manually change the date using the keyboard, it is supported but very buggy.
- Calendar popover is not mobile friendly.
- Search Button is unnecessary because the date range is the only filter.

### Solutions

- Contribute to fix keyboard interractions (multiple open issues on github).
- On smaller screens, use a full page to display the date range picker and avoid using popovers (ex: Airbnb, on web vs on mobile).
- Change to two separate date pickers (from, to) with native date support.

## Search Result

### Problems

- Does not scale well with large number of items.
- Result count oddly integrated.
- On a smaller screen, the table header's cells are not evenly spread.

### Solutions

- Paginated responsive table with integrated result count (at the bottom).

## Other

### Problems

- Lack of search filters making it difficult to audit the security.
- No real UI identity, feels unfinished.

### Solutions

- Add a search bar with intelligent search query functionnality (ex: Github issues).
- Define proper font and color code.
