describe('OrangeHRM Login Feature - All Test Cases with Intercept', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('ID_VLOGIN - Valid Login', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/dashboard');
  });

  it('ID_INVUSER - Invalid Username', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').should('be.visible').type('admin1');
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200,302]);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('ID_INVPASS - Invalid Password', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('salah');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200,302]);
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
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').should('be.visible').type('Admin');
    cy.get('input[name="password"]').should('be.visible').type('admin123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/dashboard');

    cy.reload();
    cy.url().should('include', '/dashboard');
  });
});
