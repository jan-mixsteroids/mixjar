const Mixjar = require('./index');

const mixcloud = new Mixjar.Mixcloud();
mixcloud.search('ndungujan23', 'user', false, 'ccc').then(console.log).catch(console.log);

// mixcloud.show('spartacus', 'party-time', false).then(console.log).catch(console.log);
// mixcloud.user('spartacus', false).then(console.log).catch(console.log);
// mixcloud.tag('spartacus', true).then(console.log).catch(console.log);
// mixcloud.tag_and_city('funk', 'athens', true).then(console.log).catch(console.log);

