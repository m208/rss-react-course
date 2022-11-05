export const fetchMock = () =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(fakeResponce),
    ok: true,
  });

const fakeResponce = {
  photos: {
    photo: [
      {
        id: '',
        server: '',
        secret: '',
        dateupload: '',
        owner: '',
        ownername: '',
        title: 'Test title',
        description: {
          _content: '',
        },
      },
    ],
  },
};
