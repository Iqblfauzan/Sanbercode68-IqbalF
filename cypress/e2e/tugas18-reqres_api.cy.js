describe('Reqres.in API Automation Test (Fixed)', () => {

  const api = 'https://reqres.in/api'

  it('GET: List Users (Page 2)', () => {
    cy.request(`${api}/users?page=2`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data).to.be.an('array')
    })
  })

  it('GET: Single User', () => {
    cy.request(`${api}/users/2`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.id).to.eq(2)
    })
  })

  it('GET: Single User Not Found', () => {
    cy.request({
      url: `${api}/users/23`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  it('POST: Create User', () => {
    cy.request({
      method: 'POST',
      url: `${api}/users`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'morpheus',
        job: 'leader'
      }
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('createdAt')
    })
  })

  it('PUT: Update User', () => {
    cy.request({
      method: 'PUT',
      url: `${api}/users/2`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'neo',
        job: 'zion resident'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('updatedAt')
    })
  })

  it('PATCH: Partial Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${api}/users/2`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        job: 'zion leader'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('updatedAt')
    })
  })

  it('DELETE: Delete User', () => {
    cy.request('DELETE', `${api}/users/2`).then((res) => {
      expect(res.status).to.eq(204)
    })
  })

  it('POST: Register - Success', () => {
    cy.request({
      method: 'POST',
      url: `${api}/register`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('token')
    })
  })

  it('POST: Register - Failed', () => {
    cy.request({
      method: 'POST',
      url: `${api}/register`,
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'sydney@fife' },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body).to.have.property('error')
    })
  })

  it('POST: Login - Success', () => {
    cy.request({
      method: 'POST',
      url: `${api}/login`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('token')
    })
  })

  it('POST: Login - Failed', () => {
    cy.request({
      method: 'POST',
      url: `${api}/login`,
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'peter@klaven' },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body).to.have.property('error')
    })
  })

  it('GET: Delayed Response', () => {
    cy.request(`${api}/users?delay=3`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data).to.be.an('array')
    })
  })

})
