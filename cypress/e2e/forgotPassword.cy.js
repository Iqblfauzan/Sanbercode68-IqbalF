import ForgotPasswordPage from '../support/pageObjects/forgotPasswordPage';

describe('Pengujian Forgot Password OrangeHRM', () => {
  const forgot = new ForgotPasswordPage();

  it('Berhasil mengirim permintaan reset password', () => {
    forgot.visitLoginPage();

    // Klik link "Forgot your password?"
    forgot.clickForgotPassword();

    // ✅ Verifikasi berada di halaman request password
    cy.url().should('include', '/requestPasswordResetCode');

    // Input username dan klik tombol Reset Password
    forgot.enterUsername('Admin');
    forgot.clickResetPassword();

    // ✅ Verifikasi URL setelah klik Reset Password
    cy.url().should('include', '/sendPasswordReset');

    // Screenshot untuk dokumentasi
    cy.screenshot('Reset-Password-Berhasil');
  });
});
