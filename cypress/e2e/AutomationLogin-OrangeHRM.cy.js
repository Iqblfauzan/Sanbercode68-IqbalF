describe('OrangeHRM Login Feature - All Test Cases', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('ID_VLOGIN - Valid Login', () => {
    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/dashboard');
  });

  it('ID_INVUSER - Invalid Username', () => {
    cy.get('input[name="username"]').should('be.visible').type('admin1');
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('ID_INVPASS - Invalid Password', () => {
    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('salah');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('ID_BLANKUSER - Empty Username', () => {
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('ID_BLANKPASS - Empty Password', () => {
    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('ID_ALLBLANK - All Fields Empty', () => {
    cy.contains('button', 'Login').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');
  });

  it('ID_REFRESH - Refresh After Login', () => {
    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();
    cy.url().should('include', '/dashboard');
    cy.reload();
    cy.url().should('include', '/dashboard');
  });
});
