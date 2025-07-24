// cypress/support/page_objects/loginPage.js

class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  getUsernameInput() {
    return cy.get('input[name="username"]')
  }

  getPasswordInput() {
    return cy.get('input[name="password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }

  getDashboardTitle() {
    return cy.get('h6.oxd-topbar-header-breadcrumb-module')
  }

  login(username, password) {
    this.getUsernameInput().type(username)
    this.getPasswordInput().type(password)
    this.getLoginButton().click()
  }
}

export default new LoginPage()