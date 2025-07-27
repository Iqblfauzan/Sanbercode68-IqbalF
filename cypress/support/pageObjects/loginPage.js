class LoginPage {
  visit() {
    // Membuka halaman utama login OrangeHRM
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Menunggu input username muncul agar siap digunakan
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');
  }

  enterUsername(username) {
    // Mengisi input username
    cy.get('input[name="username"]').type(username);
  }

  enterPassword(password) {
    // Mengisi input password
    cy.get('input[name="password"]').type(password);
  }

  clickLogin() {
    // Menekan tombol login
    cy.get('button[type="submit"]').click();
  }

  verifyLoginSuccess() {
    // Memastikan user dropdown (kanan atas) muncul sebagai tanda login berhasil
    cy.get('.oxd-userdropdown-name', { timeout: 10000 }).should('be.visible');
  }

  verifyDashboardVisible() {
    // Memastikan teks "Dashboard" terlihat
    cy.get('.oxd-topbar-header-title', { timeout: 10000 }).should('contain.text', 'Dashboard');
  }
}

export default LoginPage;
