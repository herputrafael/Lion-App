// Mock Request

export const userLogin = (username, password) =>
  new Promise(resolve => {
    setTimeout(() => {
      if (username === 'admin' && password === 'Password12*') {
        resolve({
          success: true,
          userData: {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            adress: 'Example Street',
            phone: '0777 777 777',
          },
          token: 'mock-token-1234567890',
        });
      } else {
        resolve({ success: false });
      }
    }, 200);
  });
