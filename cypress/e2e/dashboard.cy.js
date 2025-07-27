// Pengujian menu Directory berdasarkan Job Title menggunakan POM

import LoginPage from '../support/pageObjects/loginPage';
import DashboardPage from '../support/pageObjects/dashboardPage';

describe('Pengujian Menu Directory OrangeHRM berdasarkan Job Title', () => {
  const login = new LoginPage();
  const dashboard = new DashboardPage();

  it('Login, buka Directory, cari berdasarkan Job Title HR Manager', () => {
    // Intercept API directory
    cy.intercept('GET', '/web/index.php/api/v2/directory/employees*').as('directoryAPI');

    // Login
    cy.visit('/web/index.php/auth/login');
    login.enterUsername('Admin');
    login.enterPassword('admin123');
    login.clickLogin();
    login.verifyLoginSuccess();

    // Akses menu Directory
    dashboard.clickDirectoryMenu();
    cy.wait('@directoryAPI').its('response.statusCode').should('eq', 200);
    dashboard.verifyDirectoryPage();

    // Pilih job title "HR Manager"
    cy.get('div.oxd-select-text').eq(0).click();
    cy.get('.oxd-select-dropdown').contains('HR Manager').click();

    // Klik tombol Search
    cy.get('button[type="submit"]').click();

    // Verifikasi hasil pencarian muncul
    cy.wait('@directoryAPI');
    cy.get('.orangehrm-directory-card').should('exist');

    // Screenshot hasil pencarian
    cy.screenshot('Directory-JobTitle-HRManager');
  });
});
