import LoginPage from '../support/pageObjects/loginPage';

describe('Pengujian Login OrangeHRM', () => {
  const login = new LoginPage();

  it('Berhasil login dengan kredensial valid', () => {
    //cy.intercept('POST', '**/web/index.php/api/v2/login').as('@loginAPI');

    login.visit();
    login.enterUsername('Admin');
    login.enterPassword('admin123');
    login.clickLogin();

    
    //cy.wait('@loginAPI');

    login.verifyLoginSuccess();
    login.verifyDashboardVisible();

    cy.screenshot('Login-Berhasil');
  });

  it('Gagal login dengan kredensial tidak valid', () => {
    login.visit();
    login.enterUsername('Admin');
    login.enterPassword('salahpassword');
    login.clickLogin();

    // Verifikasi error message muncul
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');

    cy.screenshot('Login-Gagal');
  });
});
