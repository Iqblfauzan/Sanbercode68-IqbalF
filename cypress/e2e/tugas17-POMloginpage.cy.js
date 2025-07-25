// cypress/e2e/login_test.cy.js

import loginPage from '../support/page_objects/loginPage'

describe('Login Test - OrangeHRM', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('should login successfully with valid credentials', () => {
  loginPage.visit();
  loginPage.login('Admin', 'admin123');
  loginPage.getDashboardTitle().should('be.visible'); // Tidak tergantung bahasa
});

})
