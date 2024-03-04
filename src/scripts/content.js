const observations = document.querySelectorAll('.Observation');

const toc = {};

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

const ol = document.createElement('ol');

Object.entries(toc).forEach(([alpha6, data]) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const spanCom = document.createElement('span');
  const spanSci = document.createElement('span');
  const count = document.createElement('span');

  li.dataset.sid = alpha6;

  spanCom.classList.add('common', 'Heading-main');
  spanSci.classList.add('sci', 'Heading-sub', 'Heading-sub--sci');
  li.classList.add('Heading', 'Heading--h5');

  spanSci.style.marginLeft = 0;
  count.style.marginLeft = '0.5rem';

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

const content = document.querySelector('#content');

content.insertBefore(ol, content.children[0]);
