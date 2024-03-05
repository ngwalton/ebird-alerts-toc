const observations = document.querySelectorAll('.Observation');

const toc = {};

const div = document.createElement('div');
div.id = 'alerts-toc-sidenav';

const ol = document.createElement('ol');
ol.id = 'alerts-toc-ol';

const button = document.createElement('button');
button.innerText = 'Show table of contents';
button.classList.add('Button', 'Button--large', 'Button--highlight');
button.id = 'alerts-toc-button';

observations.forEach((obs) => {
  const { id } = obs;
  const com = obs.querySelector('.Heading-main').textContent;
  const sci = obs.querySelector('.Heading-sub--sci').textContent;
  const alpha6 = obs.querySelector('a[data-species-code]').dataset.speciesCode;

  if (!toc[alpha6]) {
    toc[alpha6] = {
      id,
      com,
      sci,
      alpha6,
      count: 0,
    };
  }

  toc[alpha6].count += 1;
});

Object.entries(toc).forEach(([alpha6, data]) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const spanCom = document.createElement('span');
  const spanSci = document.createElement('span');
  const count = document.createElement('span');

  li.dataset.sid = alpha6;

  spanCom.classList.add('alerts-toc-com', 'Heading-main');
  spanSci.classList.add('alerts-toc-sci', 'Heading-sub', 'Heading-sub--sci');
  li.classList.add('Heading', 'Heading--h5');
  count.classList.add('alerts-toc-count');

  a.setAttribute('href', `#${data.id}`);
  spanCom.textContent = data.com;
  spanSci.textContent = data.sci;
  count.textContent = `(${data.count})`;

  a.appendChild(spanCom);
  a.appendChild(spanSci);

  li.appendChild(a);
  li.appendChild(count);

  ol.appendChild(li);
});

div.appendChild(ol);

button.addEventListener('click', (event) => {
  event.preventDefault();

  const main = document.querySelector('.Page.Page--elevation');
  const tocIsClosed = ['', '100%'].includes(div.style.right);

  div.style.right = tocIsClosed ? '75%' : '';
  main.style.marginLeft = tocIsClosed ? '25%' : '';
});

document.querySelector('body').prepend(div);
document.querySelector('.GridFlex-cell.u-md-size2of3').appendChild(button);
