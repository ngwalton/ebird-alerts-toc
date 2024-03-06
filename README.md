[eBird alerts TOC](https://github.com/ngwalton/ebird-alerts-toc) is a chrome
extension to add a table of contents to [alerts](https://ebird.org/alerts) pages
on [eBird](https://ebird.org/).

The table of contents displays a list of all species reported on the alerts
page along with the number of reports made. Click any species in the TOC to
navigate to the first occurrence of that species on the page. This is handy for
alerts pages that have many species and/or many reports of each species. You can
quickly see if there are any species you are interested in taking a closer look
at instead of having to scan a long list of reports.

Currently this is only available as an _unpacked_ extension (i.e. it is not
yet available on the [Chrome Web Store](https://chromewebstore.google.com/)). To
install, first download/unzip or clone this repo. Then open
`chrome://extensions/` in Chrome, toggle **Developer mode** to on, click
**Load unpacked**, and select the `src` directory (see
[Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)).
_eBird alerts TOC_ should now be installed. Navigate to
[eBird alerts](https://ebird.org/alerts) and choose your favorite alert
(requires that you log in to eBird). When
you view any alerts page you will see a button on the left labeled
_Table of Contents_. Click the button to open/close the table of contents.

This extension is in early development. It will eventually be available on the
Chrome Web Store and be adapted for Firefox.
