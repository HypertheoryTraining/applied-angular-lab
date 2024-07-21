import { http, HttpResponse } from 'msw';

const software = [
  {
    id: '1',
    name: 'Word (Microsoft)',
  },
  {
    id: '2',
    name: 'Excel (Microsoft)',
  },
  {
    id: '3',
    name: 'Visual Studio Code (Microsoft)',
  },
  {
    id: '4',
    name: 'Destiny 2 (Bungie)',
  },
  {
    id: '5',
    name: 'Rider (Jetbrains)',
  },
  {
    id: '6',
    name: 'Visual Studio (Microsoft)',
  },
];

const handlers = [
  http.get('/api/user/software', async () => {
    //await delay(3000);

    return HttpResponse.json({
      data: software,
    });
  }),
];

export default handlers;
