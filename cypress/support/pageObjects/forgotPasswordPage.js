class ForgotPasswordPage {
  visitLoginPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  clickForgotPassword() {
    cy.get('.orangehrm-login-forgot-header').click();
  }

  enterUsername(username) {
    cy.get('input[placeholder="Username"]').type(username);
  }

  clickResetPassword() {
    cy.get('button[type="submit"]').click();
  }

  verifyResetSuccess() {
    // Tunggu hingga halaman berhasil di-redirect dan menampilkan elemen berikut
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password link sent successfully');
  }
}
export default ForgotPasswordPage;
