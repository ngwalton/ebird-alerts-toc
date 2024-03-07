const minTocWidthPct = 25;
const maxTocWidthPct = 30;
const mediaBreakPt = '(min-width: 904px)';

const observations = document.querySelectorAll('.Observation');

const toc = {};

const div = document.createElement('div');
const ol = document.createElement('ol');
const liHeader = document.createElement('li');
const button = document.createElement('button');
const buttonTextSpan = document.createElement('span');
const buttonIconSpan = document.createElement('span');

const mkID = (suffix) => `alerts-toc-${suffix}`;

function getTocWidthPct() {
  const largeScreen = window.matchMedia(mediaBreakPt).matches;
  return largeScreen ? maxTocWidthPct : minTocWidthPct;
}

function tocIsClosed() {
  return ['', '100%'].includes(div.style.right);
}

function getMainContent() {
  return document.querySelector('.Page.Page--elevation');
}

function scrollToObs(click) {
  click.preventDefault();
  const id = click.currentTarget.getAttribute('href');

  document.querySelector(id).scrollIntoView({
    scrollIntoViewOptions: {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    },
  });
}

div.id = mkID`sidenav`;
ol.id = mkID`ol`;
liHeader.id = mkID`header`;
button.id = mkID`button`;
buttonIconSpan.id = mkID`button-icon`;

liHeader.innerHTML = '<span>Species</span><span>#Obs</span>';
buttonTextSpan.textContent = 'Table of Contents';
buttonIconSpan.innerHTML =
  '<svg class="Icon Icon--triangleDown" role="img">' +
  '<use xlink:href="#Icon--triangleDown"></use>' +
  '</svg>';

liHeader.classList.add('Heading', 'Heading--h4');
button.classList.add('Button', 'Button--large');

ol.append(liHeader);
button.append(buttonTextSpan, buttonIconSpan);

observations.forEach((obs) => {
  const alpha6 = obs.querySelector('a[data-species-code]').dataset.speciesCode;

  if (!toc[alpha6]) {
    toc[alpha6] = {
      id: obs.id,
      com: obs.querySelector('.Heading-main').textContent,
      sci: obs.querySelector('.Heading-sub--sci').textContent,
      count: 0,
    };
  }

  toc[alpha6].count += 1;
});

Object.values(toc).forEach((entry) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const spanCom = document.createElement('span');
  const spanSci = document.createElement('span');
  const count = document.createElement('span');

  spanCom.classList.add(mkID`com`, 'Heading-main');
  spanSci.classList.add(mkID`sci`, 'Heading-sub', 'Heading-sub--sci');
  li.classList.add('Heading', 'Heading--h5');
  count.classList.add(mkID`count`);

  a.setAttribute('href', `#${entry.id}`);
  spanCom.textContent = entry.com;
  spanSci.textContent = entry.sci;
  count.textContent = entry.count;

  a.addEventListener('click', scrollToObs);
  a.append(spanCom, spanSci);
  li.append(a, count);
  ol.append(li);
});

div.append(ol);

button.addEventListener('click', (event) => {
  event.preventDefault();

  const tocWidthPct = getTocWidthPct();
  const main = getMainContent();
  const svg = buttonIconSpan.querySelector('svg');
  const closed = tocIsClosed();

  div.style.right = closed ? `${100 - tocWidthPct}%` : '';
  main.style.left = closed ? `${tocWidthPct}%` : '';
  button.style.left = closed ? `calc(${tocWidthPct}% + 2px)` : '';
  svg.style.transform = closed ? 'rotate(180deg)' : '';
});

window.addEventListener('resize', () => {
  const tocWidthPct = getTocWidthPct();
  const main = getMainContent();

  if (!tocIsClosed()) {
    div.style.right = `${100 - tocWidthPct}%`;
    main.style.left = `${tocWidthPct}%`;
    button.style.left = `calc(${tocWidthPct}% + 2px)`;
  }
});

document.querySelector('body').append(div, button);
