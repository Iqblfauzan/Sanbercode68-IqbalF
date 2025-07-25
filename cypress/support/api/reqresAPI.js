class ReqresAPI {
  listUsers(page = 2) {
    return cy.request('GET', `https://reqres.in/api/users?page=${page}`);
  }

  singleUser(id) {
    return cy.request('GET', `https://reqres.in/api/users/${id}`);
  }

  createUser(payload) {
    return cy.request('POST', 'https://reqres.in/api/users', payload);
  }

  updateUser(id, payload) {
    return cy.request('PUT', `https://reqres.in/api/users/${id}`, payload);
  }

  patchUser(id, payload) {
    return cy.request('PATCH', `https://reqres.in/api/users/${id}`, payload);
  }

  deleteUser(id) {
    return cy.request('DELETE', `https://reqres.in/api/users/${id}`);
  }

  register(payload, expectFail = false) {
    return cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      body: payload,
      failOnStatusCode: !expectFail
    });
  }

  login(payload, expectFail = false) {
    return cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      body: payload,
      failOnStatusCode: !expectFail
    });
  }

  delayedUsers(delay = 3) {
    return cy.request('GET', `https://reqres.in/api/users?delay=${delay}`);
  }
}

export default new ReqresAPI();
